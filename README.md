# LionsList

LionsList is a student-focused web-based marketplace designed exclusively for York University to buy and sell academic materials within the York University Community

## Motivation

General marketplaces such as Kijiji and Facebook Marketplace do allow people to list textbooks and academic supplies but are not specifically aimed at university students. These platforms do not have the ability to filter by course, nor the verification of the users. Consequently, students frequently come across irrelevant listings, unreliable buyers, scams, and low value offers on these platforms.

The official York University bookstore is where students can get the academic materials they need. However, prices are usually fixed at high retail prices paired with a strict refund, return, and exchange policy. Online forums like the unofficial York University subreddit provide a medium for students to communicate, but lack structured listings, filter functionality, and user verification.

LionsList addresses these limitations by providing:

- York University Exclusive Access
- Course-code Filtering
- User Verification
- Searchable Academic Materials Listings
- Flexible Student Pricing


## Installation
The Requirements are:
- MongoDB
- Node.js(LTS)
- Your Preferred Editor

Instructions:
1. Clone the Repository
```bash
git clone https://github.com/EECS3311W26/project-lionslist.git
```
2. Go into the server directory, then run the following command to install backend dependencies
```bash
npm install
```
3. Go into the client directory, then run the following command to install frontend dependencies
```bash
npm install
```
4. Go into the server directory and create a `.env` file and fill the following:
```bash
PORT=
MONGO_URI=
```
5. Go to ``client/src/lib/axios.js`` to change the baseURL. This is your backend URL, which is currently set to ``http://localhost:4000``.
 
## How to Run
Make sure that the Installation is done before going through the following instructions. 
Instructions:
1. Go into the server directory, then run the following command to run the backend.
```bash
npm run dev
```
2. Go into the client directory,y then run the following command to run the frontend. Use the link in the client terminal to view the frontend.
```bash
npm run dev
```
3. Application is Running!

## Contribution
To contribute, please do the following:

Branching:
- `main` is for stable, release-ready code
- `dev` is for integration
- `feature/<name>` for Feature Branches

Rules:
- No direct commits to `main`
- All merges require a Pull Request
- At least one review/approval before merging
- Small, clear commits with meaningful messages

Commit Message Format (example):
- `feat: add search filter`
- `fix: handle empty cart`
- `docs: update sprint documentation`
  
