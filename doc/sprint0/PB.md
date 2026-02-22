# Product Backlog

---

## User Story #1
As a student, I want to register using my YorkU email so that only verified York students can access the marketplace.

**Criteria of Satisfaction**
- Email must be from the domain `@yorku.ca` or `@my.yorku.ca`, otherwise registration fails
- Email cannot already be registered
- Password must be at least 8 characters
- User credentials are stored in the database
- Account can be logged into after successful registration

---

## User Story #2
As a student with a registered account, I want to log in so that I can access marketplace features.

**Criteria of Satisfaction**
- Valid credentials grant access
- Invalid credentials display an error message
- User session is created upon login

---

## User Story #3
As a student with a registered account, I want to log out to securely end my session on the marketplace.

**Criteria of Satisfaction**
- Logout button is accessible when logged in
- Logout results in session termination
- User is redirected to the login page

---

## User Story #4
As a student, I want to create a unique username during registration so that I can be identified on the marketplace without exposing my email or personal information.

**Criteria of Satisfaction**
- Username must be unique and cannot already be registered
- Username must meet defined character length requirements
- Username is stored in the database
- Username is displayed on listings, offers, and messages

---

## User Story #5
As a student, I want to filter listings by category so that I can find the academic resources I seek.

**Criteria of Satisfaction**
- User can filter listings by category (Textbook, Notes, Lab Kit, Stationery, Study Guide)
- User can filter listings by course title 
- Applying filters updates displayed results accordingly

---

## User Story #6
As a student, I want to search listings by keywords in the title so that I can quickly find specific available items.

**Criteria of Satisfaction**
- Only listings with status "Available" are shown by default
- Results display listings containing matching keywords in the title
- Empty or unspecified search returns all available listings

---

## User Story #7
As a student, I want to view detailed information about a listing so that I can evaluate it before making an offer.

**Criteria of Satisfaction**
- Detail page shows title, description, price, category, and course code (if provided)
- Listing details and seller username are clearly displayed
- Only listings with status "Available" can be acted on by buyers

---

## User Story #8
As a seller, I want to create a listing so that I can sell an academic resource.

**Criteria of Satisfaction**
- Title, description, category, and price are required fields
- Price must be a positive number
- Listing status defaults to "Available"
- Listing appears on the marketplace after creation

---

## User Story #9
As a seller, I want to view all listings I have created so that I can manage and track their status.

**Criteria of Satisfaction**
- Only logged-in users can access the “My Listings” page  
- Page displays all listings created by the logged-in user  
- Clicking a listing redirects to its detail page  

---

## User Story #10
As a seller, I want to edit my existing listings so that I can update price or description.

**Criteria of Satisfaction**
- Seller can modify title, description, category, and price
- Changes are saved to the database
- Updates are reflected immediately on the listing

---

## User Story #11
As a seller, I want to delete my listing if I no longer wish to sell the academic resource.

**Criteria of Satisfaction**
- Deleted listing no longer appears in browse results
- Deletion is saved to the database and takes effect immediately
- Any pending offers on the listing change to "Rejected"

---

## User Story #12
As a buyer, I want to make an offer on a listing so that I can negotiate the price.

**Criteria of Satisfaction**
- Offer amount must be a positive number
- Offer is linked to both buyer and listing
- Offer status defaults to "Pending"
- Seller can view details of offers made on their listings

---

## User Story #13
As a buyer, I want to cancel my pending offer if I am no longer interested.

**Criteria of Satisfaction**
- Offer status changes from "Pending" to "Cancelled"
- Seller can see the cancellation
- Listing remains "Available"

---

## User Story #14
As a seller, I want to reject unwanted offers on my listings

**Criteria of Satisfaction**
- Offer status changes from "Pending" to "Rejected"
- Buyer can see the rejection
- Listing remains "Available"

---

## User Story #15
As a seller, I want to accept an offer made on my listing

**Criteria of Satisfaction**
- Offer status changes from "Pending" to "Accepted"
- Listing status changes from "Available" to "Sold"
- All other pending offers on the listing change to "Rejected"

---

## User Story #16
As a seller, I want to view all offers I have sent so that I can manage and track their status

**Criteria of Satisfaction**
- Only logged-in users can access the “Sent Offers” page  
- Page displays all offers sent by the logged-in user  

---

## User Story #17
As a buyer, I want to rate a seller after a completed transaction so that future users can assess the seller’s reputation.

**Criteria of Satisfaction**
- Rating must be between 1 and 5
- Rating is linked to an existing completed transaction
- Seller’s average rating updates automatically

---

## User Story #18
As a seller, I want to rate a buyer after a completed transaction so that future sellers can assess the buyer’s reputation.

**Criteria of Satisfaction**
- Rating must be between 1 and 5
- Rating is linked to an existing completed transaction
- Buyer’s average rating updates automatically

---

## User Story #19
As a user, I want to view a user’s profile by username and see their previous ratings as a buyer and seller so that I can assess their reputation.

**Criteria of Satisfaction**
- Profile displays username
- Profile displays average rating as buyer and as seller
- Profile displays number of completed transactions

---

## User Story #20
As a buyer, I want to send a message to a seller from a listing page so that I can ask questions before making or accepting an offer.

**Criteria of Satisfaction**
- Message button is visible on the listing detail page
- Only logged-in users can send messages
- Message must contain text (cannot be empty)
- Message is stored in the database and linked to sender, receiver, and listing
- Seller can view the received message in their inbox

---

## User Story #21
As a user, I want to view my message conversations so that I can communicate with buyers or sellers about listings.

**Criteria of Satisfaction**
- User can view a list of conversation threads
- Each thread shows the other participant’s username and the associated listing
- Messages display sender, content, and last timestamp
- Only participants in the conversation can view the messages
- New messages appear in the correct conversation thread