# Backend


## Overview
The backend for LionsList provides the server-side logic and protected API endpoints needed for:
- Authentication
- Listing management 
- Offer management

In Sprint 2, the backend was expanded to support:
- Seller listing management
- Offer creation
- Offer details
- Seller-side viewing of offers on their listing
- Buyer-side viewing of sent offers
- Individual sent-offer details
- Cancelling pending offers


Built using: 
- MongoDB
- Node.js
- Express
- JSON Web Tokens (JWT)
- bcrypt

### API Endpoints:

__Register__
- URL: ``/register``
- HTTP Method: POST
- Request Body:
``` JSON
{
	"username": "name",
	"email": "name@yorku.ca",
	"password": "111123132312"
}
```
- Success Response:
``` JSON
{
	"_id": "",
	"username": "name",
	"email": "name@yorku.ca",
	"token": "JWT_TOKEN"
}
```
- - HTTP Response: 201 Created
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Missing input fields or email in use
  - HTTP Response: 500 Server Error

__Login__
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
	"_id": "",
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

__CurrentUser__
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

__GetAllListings__
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
    "imageUrl": "",
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
    "imageUrl": "",
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

__GetListing__
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
    "imageUrl": "",
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

__CreateListing__
- URL: `/`
- HTTP Method: POST
- Request Body:
``` JSON
    "title": "EECS 3311 Textbook",
    "description": "Used textbook in good condition",
    "category": "Books",
    "courseCode": "EECS3311",
    "imageUrl": "",
    "price": 25
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
    "imageUrl": "",
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

__CreateOffer__
- URL: `/offers`
- HTTP Method: POST
- Headers:
``Authorization: Bearer <JWT_TOKEN>``
- Request Body:
``` JSON
{
    "listingId": "LISTING_ID",
    "amount":25
}
```
- Success Response:
``` JSON
  {
    "_id": "OFFER_ID",
    "amount": 25,
    "buyer": "BUYER_ID",
    "listing": "LISTING_ID",
    "seller": "SELLER_ID",
    "status": "Pending"
  }
```
- - HTTP Response: 201 Created
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Listing ID is required
    - Amount must be at least 0.01
    - Invalid listing ID
  - HTTP Response: 401 Unauthorized
    - Listing not found
  - HTTP Response: 404 Not Found
    - Listing not found
  - HTTP Response: 500 Server Error
    - Failed to save the offer

__GetOffersForListing__
- URL: `/offers/listing/:listingId`
- HTTP Method: GET
- Headers:
``Authorization: Bearer <JWT_TOKEN>``
- Success Response:
``` JSON
  [
    {
        "_id": "OFFER_ID",
        "amount": 25,
        "buyer": {
            "_id": "BUYER_ID",
            "username": "Buyer Name"
        },
        "listing": "LISTING_ID",
        "seller": "SELLER_ID",
        "status": "Pending"
    }
  ]
```
- - HTTP Response: 200 OK
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Invalid listing ID
  - HTTP Response: 401 Unauthorized
    - Unauthorized user
  - HTTP Response: 403 Forbidden
    - Unauthorized viewing access for this listing
  - HTTP Response: 404 Not Found
    - Listing not found
  - HTTP Response: 500 Server Error
    - Failed to fetch offers

__GetSentOffers__
- URL: `/offers/sent`
- HTTP Method: GET
- Headers:
``Authorization: Bearer <JWT_TOKEN>``
- Success Response:
``` JSON
  [
    {
        "_id": "OFFER_ID",
        "amount": 25,
        "status": "Pending",
        "listing": {	
            "_id": "LISTING_ID",
            "title": "Calculus Textbook",
            "price": 30,
            "status": "Available"
        }
    }
  ]
```
- - HTTP Response: 200 OK
- Error Responses:
  - HTTP Response: 401 Unauthorized
    - Unauthorized user
  - HTTP Response: 500 Server Error
    - Failed to fetch sent offers

__GetOfferDetails__
- URL: `/offers/:offerId`
- HTTP Method: GET
- Headers:
``Authorization: Bearer <JWT_TOKEN>``
- Success Response:
``` JSON
  [
    {
        "_id": "OFFER_ID",
        "amount": 25,
        "status": "Pending",
        "listing": {	
            "_id": "LISTING_ID",
            "title": "Calculus Textbook",
            "price": 30,
            "status": "Available",
            "sellerUsername": "seller123"
        }
    }
  ]
```
- - HTTP Response: 200 OK
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Invalid offer ID
  - HTTP Response: 403 Forbidden
    - Not authorized
  - HTTP Response: 404 Not Found
    - Offer not found
  - HTTP Response: 500 Server Error
    - Failed to fetch offer

__CancelOffer__
- URL: `/offers/:offerId/cancel`
- HTTP Method: PATCH
- Headers:
``Authorization: Bearer <JWT_TOKEN>``
- Success Response:
``` JSON
  [
    {
        "_id": "OFFER_ID",
        "amount": 25,
        "buyer": "BUYER_ID",
        "listing": "LISTING_ID",
        "seller": "SELLER_ID",
        "status": "Cancelled",
        "createdAt": "DATE_TIME",
        "updatedAt": "DATE_TIME"
    }
  ]
```
- - HTTP Response: 200 OK
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Invalid offer ID
    - Only pending offers can be cancelled
  - HTTP Response: 401 Unauthorized
    - Unauthorized user
  - HTTP Response: 403 Forbidden
    - Not authorized to cancel this offer
  - HTTP Response: 404 Not Found
    - Offer not found
  - HTTP Response: 500 Server Error
    - Failed to cancel offer

__UpdateListing__
- URL: `/:id`
- HTTP Method: PUT
- Headers:
``Authorization: Bearer <JWT_TOKEN>``
- Request Body:
``` JSON
    "title": "EECS 3311 Textbook",
    "description": "Used textbook in good condition",
    "category": "Books",
    "courseCode": "EECS3311",
    "imageUrl": "",
    "price": 25
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
    "imageUrl": "",
    "seller": "",
    "createdAt": "2026-03-09T23:08:52.302Z",
    "updatedAt": "2026-03-09T23:08:52.302Z",
    "__v": 0
  }
```
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Invalid listing ID
  - HTTP Response: 403 Forbidden
    - Not authorized to edit this listing
  - HTTP Response: 404 Not Found
    - Listing not found
  - HTTP Response: 500 Server Error
    - Failed to update listing

__DeleteListing__
- URL: `/:id`
- HTTP Method: DELETE
- Headers:
``Authorization: Bearer <JWT_TOKEN>``
- Success Response:
``` JSON
  {
    "message": "Listing deleted successfully"
  }
```
- Error Responses:
  - HTTP Response: 400 Bad Request
    - Invalid listing ID
  - HTTP Response: 403 Forbidden
    - Not authorized to delete this listing
  - HTTP Response: 404 Not Found
    - Listing not found
  - HTTP Response: 500 Server Error
    - Failed to delete listing

### Middleware
__auth.js__
- This is for authentication and authorization
- Checks for JSON Web Tokens  in request header
- Verifies user tokens
- Error Response:
  - HTTP Response: 401 Unauthorized
    - Token Failed
- Protects:
  - Listing management routes
  - Offer routes
  - Sent-offer access
  - Cancel-offer access


### Schema/Validation Rules

__User__
- Username:
  - Letters and spaces only
  - 3-30 characters
- Email:
  - Has to be a valid email, this is handled by validator.js
  - Has to end with “@yorku.ca” or “@my.yorku.ca” 
  - Is unique
- Password:
  - At least 8 characters

__Listing__
- Price
  - Non-negative number

__Offer__
  - Amount
    - Required
    - Must be at least 0.01
    - Digits only 
  - Buyer
    - Required
    - References logged-in user
  - Listing
    - Required
  - Seller
    - Required
  - Status
    - Defaults to ‘Pending’
    - Can later change to ‘Cancelled’

### Error Handling
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Server Error

### Password Hashing
- Currently set to 10 rounds for salting
- Located at the bottom of User.js in models
- bcrypt is used for password hashing

### Utilities
__generateToken.js__
- Used to generate a JSON Web Token
- Currently has an expiration of 30 days