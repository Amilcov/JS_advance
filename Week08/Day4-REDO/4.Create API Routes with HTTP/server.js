const http = require('http');

const dogs = [
  {
    dogId: 1,
    name: "Fluffy",
    age: 2
  }
];

let nextDogId = 2;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parse the body of the request in JSON
    if(reqBody) reqBody = JSON.parse(reqBody);

    // route handlers

    // GET /dogs
    if (req.method === 'GET' && req.url === '/dogs') {
      // Return the dogs array as JSON in the body of the response
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(dogs));
      return res.end();
      
    }

    // GET /dogs/:dogId
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Return the specified dog as JSON in the body of the response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        let dog = dogs.filter( dog => dog.dogId === parseInt(dogId));
        res.write(JSON.stringify(dog));
        return res.end();
      }
    }

    // POST /dogs
    if (req.method === 'POST' && req.url === '/dogs') {
      // Create a new dog using the `getNewDogId` function and the body of the
        // request and return the newly created dog as JSON in the body of the
        // response
    
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        let dog = {
             dogId: nextDogId,
             name: reqBody.name,
             age: reqBody.age,
        }
        dogs.push(dog);
        getNewDogId();

        res.write(JSON.stringify(dog));
        return res.end();
    }

    // PUT or PATCH /dogs/:dogId
    if ((req.method === 'PUT' || req.method === 'PATCH')  && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Edit the specified dog using the body of the request and return the
          // editted dog as JSON in the body of the response
          let idxDogWithSerchedID;
          dogs.forEach((dog, idx) => {if (dog.dogId === parseInt(dogId)) idxDogWithSerchedID = idx});
          let dog = dogs[idxDogWithSerchedID];
          if (reqBody['name']) dog.name = reqBody['name'];
          if (reqBody['age']) dog.age = parseInt(reqBody['age']);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(dog));
          return res.end();

      }
    }

    // DELETE /dogs/:dogId
    if (req.method === 'DELETE' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Remove the specified dog from the dogs array and return a message of
          // "Successfully deleted" as JSON in the body of the response
          let idxDogWithSerchedID;
          dogs.forEach((dog, idx) => {if (dog.dogId === parseInt(dogId)) idxDogWithSerchedID = idx});

          if (idxDogWithSerchedID) {
             dogs.splice(idxDogWithSerchedID, 1);
          } 
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.write(idxDogWithSerchedID ? JSON.stringify('Successfully deleted') : JSON.stringify('Dog not found. No Deleted were done'));
          return res.end();
        
      }
    }

    // No matching endpoint
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end('Endpoint not found');
  });

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));