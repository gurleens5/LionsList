# Backend


## Overview
This section of the documentation will describe the backend of the LionsList marketplace. The backend is responsible for user management and authentication.

Built using: 
- MongoDB
- Node.js
- Express
- JSON Web Tokens (JWT)
- bcrypt

### API Endpoints:

Register
- URL: ``/register``
- HTTP Method: POST
- Request Body:
``` JSON
{
	“username”: “name”,
	“email”: “name@yorku.ca”,
	“password”: “111123132312”
}
```
- Success Response:
``` JSON
{
	“_id”: “”
	“username”: “name”,
	“email”: “name@yorku.ca”,
	“token”: “JWT_TOKEN”
}
```
- - HTTP Response: 201 Created
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Missing input fields or email in use
  - HTTP Response: 500 Server Error

Login
- URL: ``/login``
- HTTP Method: POST
- Request Body:
``` JSON
{
	"email": "name@yorku.ca",
	"password": "111123132312"
}
```
- Success Response:
``` JSON
{
	"_id": ""
	"username": "name",
	"email": "name@yorku.ca",
	"token": "JWT_TOKEN"
}
```
-  - HTTP Response: 200 OK
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Missing input fields
  - HTTP Response: 401 Unauthorized
    - Invalid inputs
  - HTTP Response: 500 Server Error

CurrentUser
- URL: ``/me``
- HTTP Method: GET
- Headers:
``Authorization: Bearer <JWT_TOKEN>``

- Success Response:
``` JSON
{
	"_id": "",
	"username": "name",
	"email": "name@yorku.ca",
	"rating": 0,
	"ratingsCount": 0,
	"createdAt": "DATE_TIME",
	"updatedAt": "DATE_TIME",
	"__v": 0
}
```
- - HTTP Response: 200 OK
- Error Responses:
  - HTTP Response: 401 Unauthorized
    - Token Failed

GetAllListings
- URL: ``/``
- HTTP Method: GET
- Successful Response:
``` JSON
[
  {
    "_id": "69af5304738eeb6acda5df13",
    "title": "EECS 3311 Textbook",
    "description": "Used textbook in good condition",
    "category": "Books",
    "price": 25,
    "status": "Available",
    "courseCode": "EECS3311",
    "seller": null,
    "createdAt": "2026-03-09T23:08:52.302Z",
    "updatedAt": "2026-03-09T23:08:52.302Z",
    "__v": 0
  },
  {
    "_id": "69af6b407e34b8e7e2260c38",
    "title": "Calculus Textbook",
    "description": "Used textbook in good condition. Some highlighting inside.",
    "category": "Books",
    "price": 35,
    "status": "Available",
    "courseCode": "MATH1013",
    "seller": null,
    "createdAt": "2026-03-10T00:52:16.055Z",
    "updatedAt": "2026-03-10T00:52:16.055Z",
    "__v": 0
  }
]
```
- Error Response:
  - HTTP Response: 500 Server Error
    - Failed to fetch listings

GetListing
- URL: ``/:id``
- HTTP Method: GET
- Request Body: 
``GET /api/listings/69af5304738eeb6acda5df13``
- Success Response:
``` JSON
  {
    "_id": "69af5304738eeb6acda5df13",
    "title": "EECS 3311 Textbook",
    "description": "Used textbook in good condition",
    "category": "Books",
    "price": 25,
    "status": "Available",
    "courseCode": "EECS3311",
    "seller": null,
    "createdAt": "2026-03-09T23:08:52.302Z",
    "updatedAt": "2026-03-09T23:08:52.302Z",
    "__v": 0
  }
```
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Invalid Listing ID
  - HTTP Response: 404 Not Found
    - Listing not found
  - HTTP Response: 500 Server Error
    - Failed to fetch listings

CreateListing
- URL: `/`
- HTTP Method: POST
- Request Body:
``` JSON
{
	"title": "EECS 3311 Textbook",
  	"description": "Used textbook in good condition",
  	"category": "Books",
  	"courseCode": "EECS3311",
  "	“price": 25
}
```
- Success Response:
``` JSON
  {
    "_id": "69af5304738eeb6acda5df13",
    "title": "EECS 3311 Textbook",
    "description": "Used textbook in good condition",
    "category": "Books",
    "price": 25,
    "status": "Available",
    "courseCode": "EECS3311",
    "seller": null,
    "createdAt": "2026-03-09T23:08:52.302Z",
    "updatedAt": "2026-03-09T23:08:52.302Z",
    "__v": 0
  }
```
- - HTTP Response: 201 Created
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Missing input fields or negative price
  - HTTP Response: 500 Server Error
    - Failed to create listing

### Middleware
auth.js
- This is for authentication and authorization
- Checks for JSON Web Tokens  in request header
- Verifies user tokens
- Error Response:
  - HTTP Response: 401 Unauthorized
    - Token Failed

### Schema/Validation Rules

User
- Username:
  - Letters and spaces only
  - 3-30 characters
- Email:
  - Has to be a valid email, this is handled by validator.js
  - Has to end with “@yorku.ca” or “@my.yorku.ca” 
  - Is unique
- Password:
  - At least 8 characters

Listing
- Price
  - Non-negative number

### Password Hashing
- Currently set to 10 rounds for salting
- Located at the bottom of User.js
- bcrypt is used for password hashing

### Utilities
generateToken.js
- Used to generate a JSON Web Token
- Currently has an expiration of 30 days