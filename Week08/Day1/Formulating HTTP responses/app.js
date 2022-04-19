const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
         if (req.method === 'GET' && req.url === '/persons') {
    
             res.statusCode = 200;

             //res.setHeader('Content-Type', 'text/plain');
             //res.write('This is persons page');
             //res.end();
             res.setHeader('Content-Type', 'text/html'); 
             let personForm = fs.readFileSync('./person-form.html', 'utf-8');
             res.write(personForm);
             res.end();

         } else if (req.method === 'POST' && req.url === '/persons')  {
            
            let reqBody = '';
            req.on('data', data => reqBody += data);
            req.on('end', () => {
          
                // PostMan/ Browser Req will be POST httplocalhost:5000/persons/name=NameOfPersonThatUserIntroduced&age=ageOfPersonThatUserIntroduced;
                let reqArry = [];
                reqBody.split('&').forEach((e,idx) => reqArry[idx] = e.split('='));
                let personName = decodeURIComponent(reqArry[0][1]);
                let personAge = reqArry[1][1];
                let personePageTemplate = fs.readFileSync('./person-page.html', 'utf-8');
                let personePage = personePageTemplate
                                    .replace(/#{person-name}/g, personName)
                                    .replace(/#{person-age}/g, personAge);    
                 


                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(personePage);
                res.end();
            }) 

         } else {
             console.log('req.method:', req.method);
             console.log('req.url:', req.url);

             req.statusCode = 200;
             res.setHeader('Content-Type', 'text/plain');
             res.write('This is page request is not developed yet. ');
             res.end();
         }
})

const port = 5000;
server.listen(port, () => console.log('Hi. I\'m Server. I\'m listening on port ', port));