
const http = require('http');
const server = http.createServer((req, res) => {
    
    if (req.method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {

        console.log('Client make the request with a POST and Content-Type = application/x-www-form-urlencoded');
        let reqBody = '';
        let pairs = {};
        req.on('data', data => reqBody += data);
       
      
        req.on('end', () => { console.log('reqBody', reqBody, '');
             reqBody.split('&').map(e => {  
                                           let pair = e.split('=');
                                           pairs[pair[0]] = decodeURIComponent(pair[1]);
                                        })
            console.log(pairs);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            for (let key in pairs) {
          
                res.write(key+ ': ' + pairs[key]);
            }
            res.end(); 
            return;

      
        })
    
    } else  {
        if (req.method === 'GET') {
           console.log('Client make the request with a GET', req.headers);
        } else if (req.method === 'POST') {
        console.log('Client make the request with a POST');
        }

    let host = req.headers['host'];
    let user_agent = req.headers['user-agent'];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    let resBody = `Server has received an request made with: 
                        .) method: GET ${req.method}
                        .) host: ${host} 
                        ') user-agent: ${user_agent}`

    res.write(resBody);
    res.end(); 
}    
})

const port = 5000;
server.listen(port, ()=> console.log('I m listenting on port ', port));

