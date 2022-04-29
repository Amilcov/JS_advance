const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {

    // Parse the body of the request as JSON if Content-Type header is
    // application/json
      if (req.headers['content-type'] === 'application/json') {
        console.log('I\'m receiving a request via JSON');
        if(reqBody) {
             req.body = JSON.parse(reqBody);
             console.log(req.body);
        }
        
      }

    // Parse the body of the request as x-www-form-urlencoded if Content-Type
    // header is x-www-form-urlencoded
    if (req.headers['content-type']=== 'application/x-www-form-urlencoded') {
      console.log('I\'m receiving a request via HTML form');
      if (reqBody) {
        req.body = reqBody
          .split("&")
          .map((keyValuePair) => keyValuePair.split("="))
          .map(([key, value]) => [key, value.replace(/\+/g, " ")])
          .map(([key, value]) => [key, decodeURIComponent(value)])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        console.log(req.body);
      }
  }
    const resBody = {
      "Hello": "World!"
    };
 
    
    // Return the `resBody` object as JSON in the body of the response
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(resBody));
    res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));