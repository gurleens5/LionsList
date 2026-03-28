# Product Backlog

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

---

## User Story #22
As a user, I want to view all completed transactions I am involved in to track my buying and selling history and interact with completed deals.

- Only logged-in users can access the “Transactions” page
- Page displays all sold listings where the logged-in user is either the buyer or the seller
- Only transactions from accepted offers are shown
- Each transaction displays listing title, offer amount, user role (Buyer or Seller), and transaction date
- Clicking a transaction redirects to the associated listing details page
- Page displays a message when no transactions exist
