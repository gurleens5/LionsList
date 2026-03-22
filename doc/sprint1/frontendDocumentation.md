# LionsList Frontend Documentation

## Overview
The frontend for **LionsList** is a **React single-page application (SPA)** that provides the user interface for several marketplace features:  
- Authentication pages (Login / Register)  
- Browse Listings page  
- Listing Detail page  
- Create Listing form  
- Navigation bar  

---

## Tech Stack
- React  
- Axios  
- JavaScript  
- HTML  
- CSS  

---

## Application Routes
| Route                  | Page / Component               |
|------------------------|--------------------------------|
| `/`                    | Home page                     |
| `/signin`              | Sign in page                  |
| `/signup`              | Sign up page                  |
| `/listings`            | Page showing all listings     |
| `/listing-details`     | Page showing detailed listing |

---

## UI Composition

### **Header**
- `Header.jsx` is a reusable navigation component displayed at the top of every page.  
- **Left side:** LionsList branding  
- **Right side:** Links for browsing listings, creating a listing, signing in, signing up, and logging out (if logged in)  

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
  - Price
  - Status  

### **Listing Details**
- Detailed page shows:  
  - Title  
  - Description  
  - Category  
  - Price  
  - Status  
  - Seller  
  - Course Code (if provided)  
  - Created timestamp  

### **Create a Listing**
**Data Collected:**  
- Title  
- Description  
- Category  
- Price  
- Status (default: “Available”)  
- Course Code (optional)  
- Seller  

**Automatic Fields:**  
- `createdAt` and `updatedAt` timestamps  

---

## Frontend Error Handling

### **Sign Up Page**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Password and Confirm Password don’t match | "Passwords do not match." |
| Required fields left empty                | "Please fill all required fields" |
| Email already registered                  | "Email in use" |
| Email not YorkU domain                     | "Must be a valid YorkU email" |
| Any API error                             | "Registration failed." |

### **Sign In Page**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Email or password field empty             | "Please type your email or password." |
| Wrong email or password                   | "Invalid email or password." |
| Any API error                             | "Login failed." |

### **Create Listing Page (Sell)**
| Scenario                                  | Message Shown |
|------------------------------------------|---------------|
| Title, description, category, or price empty | "Please fill all required fields." |
| Price ≤ 0                                 | "Price must be a positive number." |

---

