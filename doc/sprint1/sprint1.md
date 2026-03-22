# Sprint 1 

**Date:** March 5, 2026  
**Meeting Location:** Discord Voice Channel  

## Participants and Capacities
| Name                | Capacity (hours) | Attendance |
|--------------------|----------------|------------|
| Isha Chaudhry       | 15             | ✅         |
| Raymond Au          | 15             | ✅         |
| Gurleen Sandhu      | 15             | ✅         |
| Andrei Lopez        | 15             | ✅         |
| Justin Valle Amaya  | 15             | ✅         |

**Total capacity:** 75 hours  

---

## Sprint 1 Goal
Implement the core functionalities of the marketplace platform by allowing users to:  
- Create an account  
- Log in / Log out  
- Create and browse listings  

---

## Sprint 1 User Stories
| User Story | Points |
|------------|--------|
| #1 Register with YorkU Email | 3 |
| #2 Log in | 3 |
| #3 Log out | 1 |
| #4 Create Unique Email | 4 |
| #7 View a Listing’s Details | 2 |
| #8 Create Listing | 5 |

**Total points:** 18

---

## User Stories – Task Breakdown and Acceptance Criteria

### **#1 Register with YorkU Email**
**Tasks:**  
- Create User MongoDB schema – Gurleen  
- Create register API endpoint – Andrei  
- Add YorkU email validation – Andrei  
- Hash password before storing – Andrei  
- Build register page UI – Gurleen  
- Connect frontend form to API – Andrei  

**Acceptance Criteria:**  
- Reject registration if email domain is not `@yorku.ca` or `@my.yorku.ca`  
- Reject registration if email is already registered  
- Reject passwords shorter than 8 characters  
- Successfully registered accounts are stored with hashed passwords  
- Registered users can log in immediately after registration  

---

### **#2 Log In**
**Tasks:**  
- Create login API endpoint – Andrei  
- Verify email + password – Andrei  
- Create session/JWT token – Andrei  
- Build login page UI – Gurleen  
- Connect login form to backend – Andrei  

**Acceptance Criteria:**  
- Users with valid credentials can log in successfully  
- Users with invalid credentials see a clear error message  
- A user session is created upon successful login  

---

### **#3 Log Out**
**Tasks:**  
- Add logout route – Raymond  
- Destroy session or remove token – Raymond  
- Add logout button to navbar – Raymond  
- Redirect to login page – Raymond  
- Add log out UI – Justin  

**Acceptance Criteria:**  
- Logout button visible when logged in  
- Clicking logout terminates the user session  
- User redirected to login page  

---

### **#4 Create Unique Email**
**Tasks:**  
- Add email to User MongoDB schema – Gurleen  
- Verify email is unique – Andrei  
- Handle duplicate email with clear message – Andrei  
- Implement email validation (allowed chars) – Andrei  
- Add unique constraint on email (db) – Andrei  

**Acceptance Criteria:**  
- Reject emails already registered  
- Email must follow valid format (`@my.yorku.ca`)  
- Successfully registered emails stored in DB  
- User emails not publicly displayed  

---

### **#7 View a Listing’s Details**
**Tasks:**  
- Create listing detail page – Justin  
- Fetch listing by ID – Justin  
- Display title, description, price, category, status, and course code – Justin  
- Display seller username – Justin  

**Acceptance Criteria:**  
- Listing detail page shows all key fields  
- Listing’s status and seller info visible  
- Buyers interact only with listings marked “Available”  

---

### **#8 Create Listing**
**Tasks:**  
- Create listing schema – Isha  
- Review/update schema fields – Isha  
- Process and store new listing data in DB – Isha  
- Design create-listing form interface – Isha  
- Validate required fields – Isha  
- Save listing to DB – Isha  
- Build POST route for listing creation – Isha  
- Add image functionality – Isha  

**Acceptance Criteria:**  
- Title, description, category, and price required  
- Price must be positive  
- Status defaults to “Available”  
- Listing appears on marketplace immediately after creation  

---

## Spikes
- Research YorkU email validation and password hashing for secure registration  
- Explore session creation and management for login/logout  
- Test API routes for registration, login, logout, and listing creation using Postman
