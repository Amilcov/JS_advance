Restful Routes for an E-Commerce Web Site
In this project, you will document the request and response components for RESTful routes of an e-commerce web site.

Set up
Clone the project from the starter.

To set up the server that you will test your routes on, run npm install inside of the server folder. Please do not to look at the contents of the server folder until you finish this project.

To start the server, run npm start inside of the server folder. This will allow you to make requests to http://localhost:5000 using any client (browser and Postman).

To stop the server from listening to requests, press CTRL + c for Windows/Linux or CMD + c for MacOS in the terminal that you started the server (wherever you ran npm start).

Resources
Below is a list of all the resources for this e-commerce site.

user:
username: unique identifier
category:
tag: unique identifier
name
product:
productId: unique identifier
name
description
price
categories
review: a review for a single product
reviewId: unique identifier
comment
starRating
productId: of the product that the review is for
Documentation
Below is a list of operations on the e-commerce server that you can perform. For each operation, document what the components of the request should be and what you should expect from the response. Document all the important components of the request and the response. You can use a Google doc, VSCode for editing a text/markdown file, or whatever text editor you want for creating the RESTful routes documentation for this e-commerce site.

Here's how to approach creating the documentation for the e-commerce server operations:

Make a prediction based off of your knowledge of HTTP request and response components and RESTful routes to determine what the request and response components of the given operation should be.
Formulate the request using Postman and submit the request to see what the response is. The e-commerce site is located at http://localhost:5000.
If the request or response is not what you predicted it to be, then update your documentation.
If you don't see the response you want, or if you see an error status code, then the components of the request are wrong. Try playing around with the request components to get closer to the response you expect.

If you get stuck, make sure to ask for help!

The request and response components to ask for the home page of the site is filled out for you as an example.

Ask for the Home Page
Request components:

Method: GET
URL: /
Headers: none
Body: none
Response components:

Status Code: 200
Headers:
Content-Type: text/html
Body: HTML page with navigation links to other pages
To test this in Postman, create a request in Postman using the information above and send it.

The method of the request in Postman should be GET.
The root URL path in Postman should be http://localhost:5000.
The headers and body should be cleared in Postman.
Send the request.
Read the response and verify the components of the response.
If the body is filled out in Postman and you send this request, the response will not change. Do you understand why that is?

Ask for a page that doesn't exist
ADD REQUEST/RESPONSE COMPONENTS HERE

Ask for the products list page
ADD REQUEST/RESPONSE COMPONENTS HERE

Ask for the product detail page
Here's an example product on the server:

detail	value
productId	1
name	"Facial Cleansing Brush"
description	"Reaches deep pores to cleanse oil, dirt, and blackheads."
price	23.99
categories	"beauty", "electronics"
ADD REQUEST/RESPONSE COMPONENTS HERE

Ask for the create new product page
ADD REQUEST/RESPONSE COMPONENTS HERE

Submit a new product
After successful submission, user should be looking at the product detail page.

Here are the categories on the server:

tag	name
grocery	Grocery
electronics	Electronics
beauty	Beauty
toys-games	Toys and Games
health	Health
furniture	Furniture
clothing	Clothing
ADD REQUEST/RESPONSE COMPONENTS HERE

Ask for the edit product page
ADD REQUEST/RESPONSE COMPONENTS HERE

Submit an edit for an existing product
After successful submission, user should be looking at the product detail page.

ADD REQUEST/RESPONSE COMPONENTS HERE

Submit a delete for an existing product
After successful submission, user should be looking at the products list page.

ADD REQUEST/RESPONSE COMPONENTS HERE

Submit a new review for a product
After successful submission, user should be looking at the product detail page.

Here's an example review on the server:

detail	value
reviewId	1
comment	"I love this product!"
starRating	5
productId	1
ADD REQUEST/RESPONSE COMPONENTS HERE

Ask for the edit review page
ADD REQUEST/RESPONSE COMPONENTS HERE

Submit an edit for an existing review
After successful submission, user should be looking at the product detail page.

ADD REQUEST/RESPONSE COMPONENTS HERE

Submit a delete for an existing review
After successful submission, user should be looking at the product detail page.

ADD REQUEST/RESPONSE COMPONENTS HERE

Ask for all the products in a particular category by tag of the category
ADD REQUEST/RESPONSE COMPONENTS HERE

Ask for the best-selling product
Look for clues in the HTML pages from the prior responses for what the route should be.

ADD REQUEST/RESPONSE COMPONENTS HERE
