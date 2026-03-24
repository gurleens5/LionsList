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
| #5 Filter Listings by Category | 3 |
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
- Design filter UI with checklist format  
- Fetch listings by selected categories and/or course title  
- Update listings when filters are applied  
- Implement category filtering logic  
- Implement course title filtering logic  
- Add reset filters functionality  
- Show “No listings found” when no match  
- Add “Browse by category” section on homepage  
- Route category clicks to filtered Browse page  
- Add “status” dropdown in Edit Listing  

**Acceptance Criteria:**
- Users can select multiple categories and input a course title  
- Listings update immediately after applying filters  
- “No listings found” appears when no match  
- Reset clears all filters and shows all listings  
- Clicking a category routes to filtered Browse page  
- Only selected category listings are shown  

---

### #6 Search Listings by Keywords – Gurleen

**Tasks:**
- Show only available listings by default  
- Add search bar to Browse page  
- Display listings matching keywords (case-insensitive)  
- Route homepage search to Browse page  

**Acceptance Criteria:**
- Only Available listings are shown by default  
- Listings match keywords in title (case-insensitive)  
- Empty search shows all listings  
- “No listings found” appears if no match  
- Homepage search routes correctly  

---

### #9 View Own Listings as a Seller – Raymond

**Tasks:**
- Restrict page to logged-in users  
- Create My Listings page  
- Fetch user’s listings  
- Display listings grouped by status  
- Add navigation link  
- Show Available listings first  
- Enable navigation to listing details  
- Attach seller data to listings  

**Acceptance Criteria:**
- Only logged-in users can access page  
- Displays all listings by the user  
- Listings are grouped by status (Available first)  
- Clicking opens listing details  
- Empty state message shown if none exist  

---

### #10 Edit Listing – Andrei

**Tasks:**
- Add Edit button for seller-owned listings  
- Create pre-filled edit form  
- Allow updates (title, description, image, category, course code, price, status)  
- Implement backend update endpoint  
- Save changes to database  
- Refresh UI after edit  

**Acceptance Criteria:**
- Only seller sees Edit button  
- Form is pre-filled  
- All fields can be updated  
- Changes saved to database  
- UI updates immediately  
- Inputs are validated  

---

### #11 Delete Listing – Andrei

**Tasks:**
- Add Delete button  
- Add confirmation prompt  
- Implement delete endpoint  
- Remove listing from Browse & My Listings  
- Remove from database  
- Restrict deletion to owner  
- Mark pending offers as Rejected  

**Acceptance Criteria:**
- Only seller can delete  
- Confirmation required  
- Listing removed from system  
- No longer visible in UI  
- Pending offers become Rejected  

---

### #12 Make an Offer – Justin

**Tasks:**
- Add “Make Offer” button  
- Validate positive offer amount  
- Create offer schema & backend route  
- Link offer to buyer and listing  
- Set default status to Pending  
- Save to database  
- Add seller view for offers  

**Acceptance Criteria:**
- Only logged-in users can make offers  
- Offer must be positive  
- Offer linked to buyer & listing  
- Status = Pending  
- Seller can view offers  

---

### #13 Cancel Pending Offer – Justin

**Tasks:**
- Add cancel button for pending offers  
- Show cancel option only for Pending  
- Add backend route to cancel offer  

**Acceptance Criteria:**
- Only Pending offers can be cancelled  
- Status changes to Canceled  
- Seller can see canceled status  
- Listing remains Available  

---

### #16 View Sent Offers – Gurleen

**Tasks:**
- Restrict page to logged-in users  
- Create Sent Offers page  
- Fetch user’s offers  
- Display offer details (price, listing, status)  
- Add empty state message  
- Handle deleted listings gracefully  

**Acceptance Criteria:**
- Only logged-in users can access  
- Displays all sent offers  
- Shows listing info, price, and status  
- Deleted listings show limited info  

---

## Spikes

- Research multi-select category checklist (filter UI)  
- Research search bar implementation  
- Research fetching user-specific listings/offers  
- Explore CRUD APIs for listings and offers  
- Research offer lifecycle and authorization rules  
