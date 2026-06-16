# LionsList

LionsList is a student-focused web-based marketplace designed exclusively for York University to buy and sell academic materials within the York University Community

🔗 **[Live Demo](https://lions-list.vercel.app?demo=true)**
> Browsing listings is open to everyone. Full functionality (posting, offers, messaging) requires a YorkU email (@my.yorku.ca).

## Built With

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

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
JWT_SECRET=
```
5. Go to ``client/src/lib/axios.js`` to change the baseURL. This is your backend URL, which is currently set to ``http://localhost:4000``.
 
## How to Run
Make sure that the Installation is done before going through the following instructions. 
Instructions:
1. Go into the server directory, then run the following command to run the backend.
```bash
npm run dev
```
2. Go into the client directory, then run the following command to run the frontend. Use the link in the client terminal to view the frontend.
```bash
npm run dev
```
3. Application is Running!
