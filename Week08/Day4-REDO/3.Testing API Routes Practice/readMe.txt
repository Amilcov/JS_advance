Practice: Test API routes
⏱ 15 minutes

Practice: Testing API Routes
In this practice, you will learn how to make a JSON request in Postman and in the browser.

Set Up
Clone the project from the starter.

The server code is found in server.js, but try not to read the server code because it will help you train how to read error messages on the client-side to figure out how to formulate the right request to the server.

To start the server, run node server.js in your terminal.

JSON request in Postman
Make a request to GET /posts to see all the posts as a JSON array.

Then, formulate a request to POST /posts to create a new post. Make sure to send the body of your request as a JSON object with a key of message.

Here's an example of how to formulate the request body as JSON in Postman:

postman-json-request-body

Confirm that your post was created by making a request to GET /posts again to view your new post.

JSON request using fetch
GET /posts
Make a request with fetch request in the browser to GET /posts.

fetch('/posts')
Chain a .then callback onto the fetch request that will be invoked when the response for the request comes back. Parse the body of the response as JSON by calling the asynchronous .json() method on the response object.

fetch('/posts').then(res => res.json())
Chain another .then() onto that which will be invoked when the asynchronous .json() method is finished parsing the response body. The resolved value of the .json() method is the parsed JSON response body. Print that out.

fetch('/posts').then(res => res.json()).then(resBody => console.log(resBody));
Make sure you see the response body logged to the console of the browser.

Alternatively, you can formulate the fetch request like so:

(async function() {
  const res = await fetch('/posts');
  const body = await res.json();
  console.log(body);
})();
POST /posts
Make a request with fetch request in the browser to POST /posts with a serialized JSON body.

fetch('/posts', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "New Post!"
  })
})
Then parse and print the response just like how you did with the previous fetch request for GET /posts.

Make sure you see the response body logged to the console of the browser.
