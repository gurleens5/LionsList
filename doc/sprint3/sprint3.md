# Sprint 3

**Date:** March 25, 2026  
**Meeting Location:** Discord Voice Channel  

---

## Participants and Capacities

| Name | Capacity (hours) | Attendance |
|------|-----------------|------------|
| Isha Chaudhry | 15 | ✅ |
| Raymond Au | 15 | ✅ |
| Gurleen Sandhu | 15 | ✅ |
| Andrei Lopez | 15 | ✅ |
| Justin Valle Amaya | 15 | ✅ |

**Total capacity = 75 hours**  
All team members participated in the meeting.

---

## Sprint 3 Goal
Polish the marketplace experience by allowing full transaction management through accept/reject offers, ratings, and messaging systems, along with ability to view user profiles and transaction history.

---

## Sprint 3 User Stories

| User Story | Points |
|-----------|--------|
| #14 Reject Offer | 2 |
| #15 Accept Offer | 5 |
| #17 Rate Seller | 3 |
| #18 Rate Buyer | 3 |
| #19 View Users’ Profiles with Ratings | 2 |
| #20 Message a Seller | 5 |
| #21 View Messages | 5 |
| #22 View Completed Transaction History | 2 |

**Total points = 27**

---

## User stories- Task Breakdown and Acceptance Criteria

### #14 Reject Offer- Gurleen

**Tasks:**
- Add Reject button for received offers with a pending status under seller owned listings  
- Implement backend route to update offer status to "Rejected"  
- Refresh offers section after rejection  

**Acceptance Criteria:**
- Offer status changes from "Pending" to "Rejected"  
- Both the seller's "Offers Received" section and the buyer's "Sent Offers" page reflect the updated offer status  
- Listing remains "Available"  

---

### #15 Accept Offer- Raymond

**Tasks:**
- Add Accept button for received offers under seller owned listings  
- Show accept option only for offers with Pending status  
- Implement backend route to update offer status to "Accepted"  
- Update listing status to "Sold" after accepting an offer  
- Automatically update all other offers for the listing to "Rejected"  
- Create record of Transaction linked to listing, buyer, seller, and accepted offer  
- Prevent duplicate transactions for the same listing  
- Prevent further actions (accept/reject) after an offer is accepted  
- Refresh listing details and offers section after offer accepted  

**Acceptance Criteria:**
- Offer status changes from "Pending" to "Accepted"  
- Listing status changes from "Available" to "Sold"  
- All other pending offers on the listing change to "Rejected"  

---

### #17 Rate Seller- Isha

**Tasks:**
- Add “Rate Seller” button in History page  
- Show rating option only for involved listings with Accepted status  
- Create rating UI (e.g., star rating and optional comment)  
- Implement backend route to submit seller rating  
- Link rating to transaction record and the user rating  
- Prevent duplicate ratings from same user for the same transaction  
- Save rating to the database  
- Update UI after rating submission  

**Acceptance Criteria:**
- Rating must be between 1 and 5  
- Rating is linked to an existing completed transaction  
- Seller’s average rating updates automatically  

---

### #18 Rate Buyer - Andrei

**Tasks:**
- Add “Rate Buyer” button in History page  
- Show rating option only for involved listings with Accepted status  
- Create rating UI (e.g., star rating and optional comment)  
- Implement backend route to submit buyer rating  
- Link rating to seller, buyer, and offer  
- Prevent duplicate ratings from same user for the same transaction  
- Save rating to the database  
- Update UI after rating submission  

**Acceptance Criteria:**
- Rating must be between 1 and 5  
- Rating is linked to an existing completed transaction  
- Buyer’s average rating updates automatically  

---

### #19 View Users’ Profiles with Ratings- Justin

**Tasks:**
- Create Profile page  
- Implement backend route to fetch user data by ID  
- Fetch and display user ratings and reviews  
- Calculate and display average rating  
- Display name and profile information  
- Add navigation to profile page from listing details  
- Add navigation to profile page from header bar  
- Handle case where user has no ratings  

**Acceptance Criteria:**
- Profile displays username  
- Profile displays average rating as buyer and as seller  
- Profile displays number of completed transactions  

---

### #20 Message a Seller - Andrei

**Tasks:**
- Add “Message Seller” button on ListingDetailsPage  
- Create message schema/model  
- Implement backend route to send messages  
- Link message to sender, receiver, and listing  
- Create message input UI  
- Validate message content (non-empty)  
- Save message to the database  

**Acceptance Criteria:**
- Message button is visible on the listing detail page  
- Only logged-in users can send messages  
- Message must contain text (cannot be empty)  
- Message is stored in the database and linked to sender, receiver, and listing  
- Seller can view the received message in their inbox  

---

### #21 View Messages- Justin

**Tasks:**
- Create Messages page with navigation link  
- Restrict page access to logged-in users only  
- Implement backend route to fetch user messages  
- Display messages grouped by conversation (by user or listing)  
- Show message content, sender, and timestamp  
- Allow user to send replies  
- Update message list after sending a message  
- Handle empty-state when no messages exist  

**Acceptance Criteria:**
- User can view a list of conversation threads  
- Each thread shows the other participant’s username and the associated listing  
- Messages display sender, content, and last timestamp  
- Only participants in the conversation can view the messages  
- New messages appear in the correct conversation thread  

---

### #22 View Transaction History - Raymond

**Tasks:**
- Create backend route to fetch transactions for logged-in user  
- Filter transactions where user is either buyer or seller  
- Populate transaction data (listing, buyer username, seller username)  
- Create TransactionsPage.jsx  
- Fetch transactions from backend in TransactionsPage  
- Display transactions in UI using card layout  
- Show user role (Buyer / Seller) for each transaction  
- Handle empty state when no transactions exist  
- Restrict Transactions page to logged-in users only  
- Add navigation link to Transactions page in Header  

**Acceptance Criteria:**
- Only logged-in users can access the “Transactions” page  
- Page displays all sold listings where the logged-in user is either the buyer or the seller  
- Only transactions from accepted offers are shown  
- Each transaction displays listing title, offer amount, user role (Buyer or Seller), and transaction date  
- Page displays a message when no transactions exist  

---

## Spikes

- Research how to link transactions to listings, buyers, sellers, and offers and store the record in the database  
- Explore how to implement ratings for buyers and sellers and prevent duplicates  
- Explore how to create a messaging feature, including how to store messages in the database, link them to sender, receiver, and listing, group messages by conversation, and update the UI when new messages are sent or received  
