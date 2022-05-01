Parse the JSON Request Body
Parse the request body in the server as JSON only when the Content-Type header is application/json.

GET /dogs
Implement the GET /dogs API endpoint to return the dogs array as JSON.

Test this route in Postman or by using fetch in the browser.

GET /dogs/:dogId
Implement the GET /dogs/:dogId API endpoint to return the object of the specified dog as JSON. Find the specified dog object from the dogs array acting as the server data. (Hint: use Array.find() to find the specified dog based on the :dogId route parameter.)

Test this route in Postman or by using fetch in the browser.

POST /dogs
Implement the POST /dogs API endpoint to create a dog based on the body of the request. Add the dog object to the dogs array. Return the created dog object as a JSON response.

Test this route in Postman or by using fetch in the browser.

PUT or PATCH /dogs/:dogId
Implement the PUT /dogs/:dogId API endpoint to edit the specified dog based on the body of the request. Return the editted dog object as a JSON response.

Test this route in Postman or by using fetch in the browser.

DELETE /dogs/:dogId
Implement the DELETE /dogs/:dogId API endpoint to delete a dog from the server data. (Hint: use Array.findIndex() to find the array index of the dog in the dogs array. Then use Array.splice() to remove the dog from the dogs array using that index.) Afterwards, return a message in JSON of "Successfully deleted".

Test this route in Postman or by using fetch in the browser.
