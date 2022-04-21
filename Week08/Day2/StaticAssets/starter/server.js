const http = require('http');
const fs = require('fs');

function getContentType(fileName) {
  const ext = fileName.split(".")[1];
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "css":
      return "text/css";
    default:
      return "text/plain";
  }
}

const server = http.createServer((req, res) => {
  // your code here
  if (req.method === 'GET' && req.url.startsWith('/assets')) {

      let path = '.' + req.url;
      let fileName = path.substring(path.lastIndexOf('/'));
  
      try {
          if (fs.existsSync) {
      
              let file = fs.readFileSync(path);
              res.statusCode = 200;
              res.setHeader('Content-Type', getContentType(fileName));
              res.end(file);
              return;
          }

      } catch (err) {
        console.log('this is the err that was catch: ', err);
      }

  }

      const resBody = fs.readFileSync("./index.html");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(resBody);
  
  
 
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));