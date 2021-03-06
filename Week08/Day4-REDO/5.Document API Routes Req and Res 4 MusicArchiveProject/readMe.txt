API Docs for a Music Archive
In this project, you will document the request and response components for API routes of a music archive server.

Set up
Clone the project from the starter.

To set up the server that you will test your routes on, run npm install inside of the server folder. Please do not to look at the contents of the server folder until you finish this project.

To start the server, run npm start inside of the server folder. This will allow you to make requests to http://localhost:5000 using any client (browser and Postman).

To stop the server from listening to requests, press CTRL + c for Windows/Linux or CMD + c for MacOS in the terminal that you started the server (wherever you ran npm start).

Resources
Below is a list of all the resources for this music archive server.

artists:
artistId: unique identifier
name
album:
albumId: unique identifier
name
artistId: of the artist that released the album
song:
songId: unique identifier
name
lyrics
trackNumber: the order of the song in its album
albumId: of the album that the song was released with
Documentation
The music archive server receives JSON request bodies and returns JSON response bodies.

Below is a list of operations on the music archive server that you can perform. For each operation, document what the components of the request should be and what you should expect from the response. Document all the important components of the request and the response. You can use a Google doc, VSCode for editing a text/markdown file, or whatever text editor you want for creating the API routes documentation for this music archive server.

Here's how to approach creating the documentation for the music archive server operations:

Make a prediction based off of your knowledge of HTTP request and response components and API routes to determine what the request and response components of the given operation should be.
Formulate the request using Postman and submit the request to see what the response is. The music archive server can be accessed at http://localhost:5000.
If the request or response is not what you predicted it to be, then update your documentation.
If you don't see the response you want, or if you see an error status code, then the components of the request are wrong. Try playing around with the request components to get closer to the response you expect.

If you get stuck, make sure to ask for help!

The request and response components to get all the artists are filled out for you as an example.

Get all the artists
Request components:

Method: GET
URL: /artists
Headers: none
Body: none
Response components:

Status Code: 200
Headers:
Content-Type: application/json
Body: information about all the artists

[
  {
    "artistId": 1,
    "name": "Led Zeppelin"
  }
]
Test this in Postman or by using fetch in the browser.

Get a specific artist's details based on artistId
ADD REQUEST/RESPONSE COMPONENTS HERE

Add an artist
ADD REQUEST/RESPONSE COMPONENTS HERE

Edit a specified artist by artistId
ADD REQUEST/RESPONSE COMPONENTS HERE

Delete a specified artist by artistId
ADD REQUEST/RESPONSE COMPONENTS HERE

Get all albums of a specific artist based on artistId
ADD REQUEST/RESPONSE COMPONENTS HERE

Get a specific album's details based on albumId
ADD REQUEST/RESPONSE COMPONENTS HERE

Add an album to a specific artist based on artistId
ADD REQUEST/RESPONSE COMPONENTS HERE

Edit a specified album by albumId
ADD REQUEST/RESPONSE COMPONENTS HERE

Delete a specified album by albumId
ADD REQUEST/RESPONSE COMPONENTS HERE

Get all songs of a specific artist based on artistId
ADD REQUEST/RESPONSE COMPONENTS HERE

Get all songs of a specific album based on albumId
ADD REQUEST/RESPONSE COMPONENTS HERE

Get a specific song's details based on songId
ADD REQUEST/RESPONSE COMPONENTS HERE

Add a song to a specific album based on albumId
ADD REQUEST/RESPONSE COMPONENTS HERE

Edit a specified song by songId
ADD REQUEST/RESPONSE COMPONENTS HERE

Delete a specified song by songId
ADD REQUEST/RESPONSE COMPONENTS HERE
