const http = require('http');
const fs = require("fs");
const util = require("util");

let dogs = [
  {
    dogId: 1,
    name: 'Fido',
    age: 2
  },
  {
    dogId: 2,
    name: 'Fluffy',
    age: 10
  }
];

let nextDogId = 3;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

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
  console.log(`${req.method} ${req.url}`);
  if (req.method === "GET" && req.url.startsWith('/assets')) {
    const assetPath = req.url.split("/assets")[1];
    try {
      const resBody = fs.readFileSync("./assets" + assetPath);
      res.statusCode = 200;
      res.setHeader("Content-Type", getContentType(assetPath));
      res.end(resBody);
      return;
    } catch {
      console.error("Cannot find asset", assetPath, "in assets folder");
    }
  }

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
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

    // route handlers
    // GET /
    if (req.method === 'GET' && req.url === '/') {
      const htmlPage = fs.readFileSync("./views/index.html", 'utf-8');
      const resBody = htmlPage;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(resBody);
      return res.end();
    }

    //GET /dogs
    if (req.method === 'GET' && req.url === '/dogs') {
      // create a list of 'li' HTML tags that contain the names of the dogs in
      // the `dogs` array
      let liDogList = '';
      dogs.forEach (dog => liDogList += `<li>${dog.name}</li> `);

      // read and replace values in ./views/dogs.html
      const htmlPageTemplate = fs.readFileSync('./views/dogs.html', 'utf-8');
      const htmlPage = htmlPageTemplate.replace(/#{dogsList}/g, liDogList);
      
      // send the generated HTML page
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(htmlPage);
      return res.end();
    }

    //GET /dogs/new
    if (req.method === 'GET' && req.url === '/dogs/new') {
      // read and replace values in ./views/create-dog.html
      const htmlPage = fs.readFileSync('./views/create-dog.html', 'utf-8');

      // send the generated HTML page
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(htmlPage);
      return res.end();
    }
    
    // GET /dogs/:dogId
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // find dog by dogId
        const dog = dogs.find(dogObj => dogObj.dogId == dogId);
        try {
            // read and replace values in ./views/dog-details.html
            const htmlPageTemplate = fs.readFileSync('./views/dog-details.html', 'utf-8');
            const htmlPage = htmlPageTemplate.repleace(/#{name}/g, dog.name).replace(/#{age}/g, dog.age);

            // send the generated HTML page
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(htmlPage);
            return res.end();

        } catch {
            console.log('Error on trying to make a request with method: GET and url:/dogs/', dogId, ' ');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');

            const htmlPageTemplate = fs.readFileSync('./views/error.html', 'utf-8');
            const htmlPage = htmlPageTemplate.replace(/#{message}/g, 'Dog not found');

            res.write(htmlPage);
            return res.end();
      }

    }
  }

    // POST /dogs
    if (req.method === 'POST' && req.url === '/dogs') {
      try {
          const dogId = nextDogId;
          const newDog = {
                          dogId: dogId,
                          name: req.body.name,
                          age: parseInt(req.body.age)
                         };
         

          dogs.push(newDog);  
          getNewDogId();

          res.statusCode = 302;
          res.setHeader('location', `/dogs/${dogId}`);
          return res.end();
       } catch(err) {
          console.log('Error on trying to make a request with method: POST and url:/dogs. ', err);
       }

    }

    //GET /dogs/:dogId/edit
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 4 && urlParts[3] === 'edit') {
            const dogId = urlParts[2];
            // find dog by dogId
            const dog = dogs.find(dog => dog.dogId == dogId);
            try {
                // read and replace values in ./views/edit-dog.html
                const htmlPageTemplate = fs.readFileSync('./views/edit-dog.html', 'utf-8');
                const htmlPage = htmlPageTemplate.replace(/#{name}/g,dog.name).replace(/#{dog.age}/g, dog.age);

                // send the generated HTML page
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(htmlPage);
                return res.end();

            } catch {
                console.log('Error on trying to make a request with method: Get and url:/dogs/', dogId, '/edit');
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');

                const htmlPageTemplate = fs.readFileSync('./views/error.html', 'utf-8');
                const htmlPage = htmlPageTemplate.replace(/#{message}/g, 'Dog not found');

                res.write(htmlPage);
                return res.end();
            }
      }
    }

    // POST /dogs/:dogId
    if (req.method === 'POST' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // find dog by dogId
        const dogIdx = dogs.findIndex(dog => dog.dogId == dogId);
        // add a new dog using information in the body of the request
        const newDog = {
                         dogId: parseInt(dogId),
                         name: req.body.name,
                         age: parseInt(req.body.age)
                         }
        if (dogIdx === -1) {
           dogs.push(newDog);
           nextDogId = dogId + 1;              
        } else {
          dogs[dogIdx] = newDog;
        }

        // redirect client to /dogs/:dogId
        res.statusCode = 200;
        res.location ='./dogs/' + dogId;
        return res.end();
      }
    }

    // No matching endpoint
    const htmlPage = fs.readFileSync("./views/error.html", 'utf-8');
    const resBody = htmlPage
      .replace(/#{message}/g, 'Page Not Found');
    
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write(resBody);
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));



