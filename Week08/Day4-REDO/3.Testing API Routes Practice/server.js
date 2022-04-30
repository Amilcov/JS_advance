const http = require('http');

const posts = [
  {
    postId: 1,
    message: "Hello World!"
  },
  {
    postId: 2,
    message: "Ciao!"
  },
];

let nextPostId = 3;

function getNewPostId() {
  const newPostId = nextPostId;
  nextPostId++;
  return newPostId;
}

const server = http.createServer((req, res) => {
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
   console.log('headeres:', req.headers);
    // Parse the body of the request as JSON if Content-Type header is
      // application/json
    // Parse the body of the request as x-www-form-urlencoded if Content-Type
      // header is x-www-form-urlencoded
    if (reqBody && req.headers['content-type'] === 'application/json') {
      console.log('app json');
      try {
        req.body = JSON.parse(reqBody);
      } catch (e) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify("Could not parse body"));
        return res.end();
      }
    }

    if (req.method === 'GET' && req.url === '/posts') {
      // Return the posts array as JSON in the body of the response
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(posts));
      return res.end();
    }

    if (req.method === 'POST' && req.url === '/posts') {
      // Return the posts array as JSON in the body of the response
      console.log('Req body is:',req.body)
      const { message } = req.body;
      if (!message) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify("Message is required"));
        return res.end();
      }
      const post = { postId: getNewPostId(), message };
      posts.push(post);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(post));
      return res.end();
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify("Endpoint not found"));
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));