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
        if (reqBody && req.headers['Content'] === 'application/json') {
          return JSON.pharse(reqBody);
        }

    // Parse the body of the request as x-www-form-urlencoded if Content-Type
      // header is x-www-form-urlencoded
     if (reqBody && req.headers['Content'] === 'application/json') {
    
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
    res.setHeader = "application/json";
    res.body = resBody;
    return res;
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));