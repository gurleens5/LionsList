# Sprint 2

**Date:** March 17, 2026  
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

**Total Capacity:** 75 hours  
**Attendance:** All team members participated  

---

## Sprint 2 Goal
Expand marketplace functionality by allowing users to:
- Filter and search listings  
- Manage their own listings (view, edit, delete)  
- Create and manage offers  

---

## Sprint 2 User Stories

| User Story | Points |
|-----------|--------|
| #5 Filter Listings by Category | 5 |
| #6 Search Listings by Keywords | 3 |
| #9 View Own Listings as a Seller | 3 |
| #10 Edit Listing | 3 |
| #11 Delete Listing | 2 |
| #12 Make an Offer | 5 |
| #13 Cancel Pending Offer | 2 |
| #16 View Sent Offers | 3 |

**Total Points:** 26  

---

## User Stories - Task Breakdown & Acceptance Criteria

### #5 Filter Listings by Category – Isha

**Tasks:**
- Design filter UI with a checklists format
- Fetch listings according to the selected categories and/or course title
- Update presented listings when filters are applied 
- Implement filtering logic for category
- Implement filtering logic for course title
- Add reset filters functionality
- Show “No listings found” when no listings match
- Add “Browse” by category section on the homepage with the names and descriptions
- Upon clicking on a category, route to the Browse page with only the selected category filter applied
- Add “status” dropdown in Edit Listing section
 

**Acceptance Criteria:**
- Users can select various categories at once (Textbook, Notes, Lab Kit, Stationery, and Study Guide) and input a course title 
- Displayed listings update immediately after filters are applied
- If no listings match the selected criteria, a “No listings found” message appears
- When the filters are reset, all available listings appear and all selections are cleared
- On the homepage, clicking a category navigates to a listings page filtered by that category
- Only listings from the selected category are shown
  

---

### #6 Search Listings by Keywords – Gurleen

**Tasks:**
- Ensure only available listings are shown by default
- Add search bar to the browse page
- Display listings containing matching keywords in the title (case-insensitive)
- Route homepage search queries to the Browse page and display listings matching the entered keywords
  

**Acceptance Criteria:**
- Only listings with status = Available are shown by default
- Listings with titles containing the search keywords (case-insensitive) are displayed
- If the search input is empty or unspecified, all available listings are displayed
- If no listings match the selected keywords, a “No listings found” message appears
- Searching from the homepage routes to the Browse page where listings with titles containing the search keywords (case-insensitive) are displayed
  

---

### #9 View Own Listings as a Seller – Raymond

**Tasks:**
- Restrict page access to logged-in users only
- Create My Listings page
- Fetch listings created by the logged-in user
- Display listings grouped or visually distinguished by status
- Add navigation link to My Listings
- Show Available listings first
- Clicking a listing redirects to its details page
- Attach seller data to created listings
  

**Acceptance Criteria:**
- Only logged-in users can access the “My Listings” page
- Page displays all listings created by the logged-in user
- Listings are distinguishable by status with “Available” listings shown first
- Clicking a listing redirects the user to the listings’s detail page
- If the user has no listings, a message saying “You have not created any listings yet” is displayed
  

---

### #10 Edit Listing – Andrei

**Tasks:**
- Add edit button for seller-owned listings
- Create edit form with current listing values pre-filled
- Allow seller to update title, description, image, category, course code, price, and status
- Implement backend endpoint/controller for updating listings
- Save updated listing data to the database
- Refresh listing details and browse results immediately after edit


**Acceptance Criteria:**
- Only the seller of a listing can view the Edit button
- Clicking Edit opens a form pre-filled with the listing’s current values
- Seller can update title, description, image, category, course code, status, and price
- Changes are saved to the database 
- Listing details and Browse pages update immediately after the edit
- All new values are validated
 

---

### #11 Delete Listing – Andrei

**Tasks:**
- Add Delete button for seller-owned listings
- Add confirmation prompt before deletion
- Implement backend endpoint/controller for deleting listings
- Remove deleted listing from browse results
- Remove deleted listing from database
- Remove deleted listing from 'My Listings' immediately
- Restrict deletion to the listing owner
- Any pending offers to the listing are changed to "Rejected"
 

**Acceptance Criteria:**
- Only the seller of a listing can view the Delete button
- Clicking Delete prompts the user to confirm deletion 
- Listing is removed from the database upon confirmation
- The listing no longer appears in “My Listings” or “Browse” pages
- All pending offers on the listing are changed to status = Rejected
 

---

### #12 Make an Offer – Justin

**Tasks:**
- Add "Make Offer" button on listing details page for logged-in users
- Validate that offer amount is a positive number
- Create offer schema and backend route
- Link each offer to the buyer and the listing
- Set new offer status to 'Pending' by default
- Save offer to the database
- Add seller view for offers made on their listings
 

**Acceptance Criteria:**
- Only logged-in users can make offers
- The offer amount must be a positive number
- Offer is linked to a buyer and a listing
- The offer’s status changes to “Pending”
- Seller can view all offers made on their listings 

---

### #13 Cancel Pending Offer – Justin

**Tasks:**
- Add cancel button for buyer’s pending offers
- Show cancel option only for offers with Pending status
- Add route to cancel pending offers, updating the offer’s status, and making changes visible to the seller and buyer

**Acceptance Criteria:**
- Only offers with a “Pending” status can be cancelled 
- The offer’s status changes from “Pending” to “Canceled” 
- Seller can view the cancelled status of the offer on the listing
- The associated listing remains "Available" after the offer is cancelled 


---

### #16 View Sent Offers – Gurleen

**Tasks:**
- Restrict page access to logged-in users only
- Create Sent Offers page with navigation link
- Fetch offers sent by the logged-in user
- Display offer details including price, the listing, and status
- Add empty-state message when no offers exist
- If a listing has been deleted, update the listing card accordingly to hide information



**Acceptance Criteria:**
- Only logged-in users can access the “Sent Offers” page
- Page displays all listings on which the user has placed offers 
- Each listing card shows the listing’s key information (similar to the Browse page) with the offer's price and status
- If an offer was made on a now-deleted listing, the listing card displays limited information

---

## Spikes

- Research multi-select category checklist to learn how to implement the filter UI through filter API
- Research search bar implementation 
- Research how to query and fetch only the listings and offers associated with the logged-in user
- Explore CRUD API endpoints for listings and offers with proper data validation and status updates 
- Research offer lifecycle and authorisation rules
 
