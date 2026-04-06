# LionsList Frontend Documentation

## Overview
The frontend for **LionsList** is a **React single-page application (SPA)** that provides the user interface for several marketplace features:  
- Home page  
- Authentication pages (Login / Register)  
- Browse Listings page with a search bar and filters  
- Listing Details page  
- Create Listing form  
- Edit Listing form  
- Sent Offers Page  
- Sent Offer Details Page  
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
| Route                  | Page / Component                     |
|------------------------|--------------------------------------|
| `/`                    | Home page                             |
| `/signin`              | Sign in page                          |
| `/signup`              | Sign up page                          |
| `/listings`            | Browse all listings                   |
| `/listing-details`     | View details of a listing             |
| `/create-listing`      | Create a new listing (auth required) |
| `/edit-listing`        | Edit an existing listing (auth required) |
| `/my-listings`         | View seller’s own listings (auth required) |
| `/sent-offers`         | View all offers sent (auth required) |
| `/sent-offers-details` | View details of an offer (auth required) |

---

## UI Composition

### **Header**
- `Header.jsx` is a reusable navigation component displayed at the top of every page.  
- **Left side:** LionsList branding  
- **Right side:** Links for browsing listings, creating a listing, accessing sent offers, viewing one’s own listings, signing in, signing up, and logging out (if logged in)  

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
