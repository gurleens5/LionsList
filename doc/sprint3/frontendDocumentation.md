# LionsList Frontend Documentation

## Overview
The frontend for **LionsList** is a **React single-page application (SPA)** that provides the user interface for several marketplace features:  
- Home page  
- Authentication pages (Login / Register)  
- Browse Listings page with a search bar and filters  
- My Listings page  
- Listing Details page  
- Create Listing form  
- Edit Listing form  
- Sent Offers Page  
- Sent Offer Details Page  
- History page for transactions  
- Profile page  
- Messages page  
- Navigation bar (Header)  

---

## Tech Stack
- React  
- Axios  
- JavaScript  
- HTML  
- CSS  

---

## Application Routes
| Route                  | Page / Component                                     |
|------------------------|-----------------------------------------------------|
| `/`                    | Home page                                           |
| `/signin`              | Sign in page                                        |
| `/signup`              | Sign up page                                        |
| `/listings`            | Browse all listings                                 |
| `/listing-details`     | View details of a listing                           |
| `/create-listing`      | Create a new listing (auth required)               |
| `/edit-listing`        | Edit an existing listing (auth required)           |
| `/my-listings`         | View seller’s own listings (auth required)         |
| `/sent-offers`         | View all offers sent (auth required)               |
| `/sent-offers-details` | View details of an offer (auth required)           |
| `/transactions`        | View completed transaction history (auth required) |
| `/messages`            | View and send messages (auth required)             |
| `/profile`             | View a user’s profile and ratings (auth required)  |

---

## UI Composition

### **Header**
- `Header.jsx` is a reusable navigation component displayed at the top of every page.  
- **Left side:** LionsList branding  
- **Right side:** Links for browsing listings, creating a listing, accessing sent offers, viewing one’s own listings, transaction history, messages, signing in, signing up, and logging out (if logged in)  

---

## Authentication Flow

### **Register (Sign Up)**
**Data Collected:**  
- Full name (`username`)  
- Email (`@my.yorku.ca` or `@yorku.ca`)  
- Password  

**Back-end Validation:**  
- Schema rules: uniqueness, length, format  
- Password hashing  
- JWT generated on successful signup  

**Front-end Validation:**  
- Full name ≥ 3 characters  
- Email ends with `@my.yorku.ca` or `@yorku.ca`  
- Password ≥ 8 characters  
- Password and Confirm Password match  

---

### **Sign In**
**Data Collected:**  
- Email (`@my.yorku.ca` or `@yorku.ca`)  
- Password  

**Back-end Validation:**  
- Checks email exists in DB  
- Compares input password with hashed password  
- JWT generated on successful login  

**Front-end Validation:**  
- Email exists  
- Password matches stored password  

---

## Listing Features

### **Browse Listings**
- Users can view all available listings  
- **Displayed on each listing card:**  
  - Image  
  - Title  
  - Description  
  - Category  
  - Course code (if provided)  
  - Price  
  - Status  

### **Listing Details**
- Detailed listing page shows:  
  - Title  
  - Description  
  - Category  
  - Course code (if provided)  
  - Price  
  - Status  
  - Seller  
  - Created timestamp  
  - Offers received (only for sellers)  
  - Edit function (only for sellers)  
  - Delete function (only for sellers)  
  - Make offer button (for non-sellers who are logged in)  

### **Create a Listing**
**Data Collected:**  
- Title  
- Description  
- Category  
- Course code (optional)  
- Image URL (optional)  
- Price  
- Status (default: “Available”)  
- Seller  

**Automatic Fields:**  
- `createdAt` and `updatedAt` timestamps  
- Seller which is set from the logged-in user  
- Status which defaults to “Available”  

### **Edit a Listing**
- All fields from the Create Listing form are editable, along with the status.  
- Changes are reflected across all pages the listing appears in.  

### **Delete a Listing**
- Only available to the seller of the listing on the Listing Details page.  
- A confirmation prompt is displayed before the listing is deleted from the database and all pages it appears in.  

### **My Listings**
- Shows all listings created by the logged-in user  
- Each listing card shows the listing information and a “View Details” button, behaving similar to cards on the Browse page  

---

## Offer Features

### **Make Offer**
- Available on Listing Details page for non-sellers who are logged in  
- Offer amount must be a positive number with up to 2 decimal places  
- Offer is saved with a “Pending” status by default  

### **Sent Offers**
- Shows all offers sent by the logged-in buyer  
- Each listing card is displayed and behaves similar to the cards on the “Browse” and “My Listings" pages, but with an offer status badge (top right corner) as well as the offer amount  

### **Sent Offer Details**
- Displays full listing information for the offer, such as in the Listing Details Page  
- Additionally, shows information for “Your Offer,” including the offer amount, the status, and a cancel offer button  

### **Accept Offer**
- Available on Listing Details page for the seller, for offers with "Pending" status  
- Accepting an offer changes the listing’s status to “Sold”, and the offer’s status to “Accepted”  
- The status of other offers on the listings are automatically changed to "Rejected"  
- A single Transaction record is created linking the listing, buyer, seller, and accepted offer  

### **Reject Offer**
- Available on Listing Details page for the seller, for offers with "Pending" status  
- Rejecting an offer changes its status to “Rejected”, and the listing remains “Available”  
- The seller’s “Offers Received" section and the buyer’s Sent Offers page reflect the updated status  

---

## Transaction History
- Displays all completed transactions where the logged-in user was either the buyer or seller  
- Each transaction card displays:  
  - Listing Image  
  - A badge indicating the user's role: Purchased (buyer) or Sold (seller) with the transaction date  
  - Listing title  
  - The other party’s username  
  - “Listed Price” or “Your Price” based on role  
  - “Your Offer” or “Offer Price” based on role  
  - A Rate Buyer or Rate Seller button if no rating has been submitted yet  
  - A star display of the submitted rating if one already exists  

### **Rating Flow**
- Clicking “Rate Buyer” or “Rate Seller” opens a modal overlay showing:  
  - Listing title and image  
  - The user being rated (buyer or seller username)  
  - An interactive 5-star selector  
  - Submit and Cancel buttons  
- Once a rating is submitted, the transaction card updates to display it, and duplicate ratings for the same transaction are prevented by the backend  

---

## Messages Features
- Displays all messages sent or received by the logged-in user  
- All messages are grouped by listing, with each group displaying the listing title as a heading and all related messages below it  
- Each message entry shows:  
  - Sender username  
  - Timestamp  
  - Message content  

### **Sending a Message (from Listing Details)**
- A "Message Seller" button appears on the Listing Details page for non-sellers who are logged in  
- Upon clicking it, a message input box appears where only a non-empty message can be sent  

---

## Profile
- A page displaying a user’s own profile of logged-in or another user’s profile  
- Each page displays:  
  - Username  
  - Average seller and buyer rating formatted to 1 decimal place and 0.0 by default  
  - Seller and Buyer ratings count  
  - Ratings and reviews section  
- Shows “No ratings yet.” if neither seller nor buyer ratings exist  
- Otherwise displays Seller Ratings and Buyer Ratings card, each displaying the average and count  

---

## Frontend Error Handling

### **Sign Up Page**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Password and Confirm Password don’t match | "Passwords do not match." |
| Required fields left empty                | "Please fill all required fields" |
| Email already registered                  | "Email in use" |
| Email not YorkU domain                     | "Must be a valid YorkU email" |
| API error                                 | "Registration failed." |

### **Sign In Page**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Email or password field empty             | "Please type your email or password." |
| Wrong email or password                   | "Invalid email or password." |
| API error                                 | "Login failed." |

### **Create/Edit Listing Page**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Title, description, category, or price empty | "Please fill all required fields." |
| Price ≤ 0                                 | "Price must be a positive number." |
| API error                                 | "Failed to create/update listing" |

### **Delete Listing**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| API error                                 | "Failed to delete listing." |

### **Make Offer**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Offer amount is empty                     | "Offer amount must be a positive number." |
| Offer amount < 0.01                       | "Value must be greater than or equal to 0.01" |
| API error                                 | "Failed to submit offer" |

### **Transaction History**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| No transactions found                     | "You have no completed transactions yet." |
| Rating submission fails                   | Error message from API response, or "Failed to submit rating" / "Failed to submit seller rating" |
| API error                                 | "Failed to load transactions." |

### **Messages Page**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| No messages exist                         | "Your conversations will appear here once you start messaging." |
| API error                                 | "Failed to load messages." |

### **Sending a Message**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Message content is empty                  | "Message cannot be empty" |
| Missing recipient or listing              | "Recipient and listing are required" |
| API error                                 | "Failed to send message." |

### **Profile Page**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| No user ID available                      | "No user found." |
| API error                                 | "Failed to load profile." |
