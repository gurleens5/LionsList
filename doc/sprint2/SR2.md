# Sprint 2 Summary

**Date:** March 23, 2026  
**Notetaker:** Gurleen Sandhu  
**Meeting Location:** Google Meets  

---

## Participants 

| Name | Attendance |
|------|------------|
| Isha Chaudhry | ✅ |
| Raymond Au | ✅ |
| Gurleen Sandhu | ✅ |
| Andrei Lopez | ✅ |
| Justin Valle Amaya | ✅ |

_All team members participated in the meeting._

---

## User Story Progress 

| User Story | Points | Assigned To | Status |
|-----------|--------|-------------|--------|
| #5 Filter Listings by Category | 5 | Isha | Completed |
| #6 Search Listings by Keywords | 3 | Gurleen | Completed |
| #9 View Own Listings as a Seller | 3 | Raymond | Completed |
| #10 Edit Listing | 3 | Andrei | Completed |
| #11 Delete Listing | 2 | Andrei | Completed |
| #12 Make an Offer | 5 | Justin | Completed |
| #13 Cancel Pending Offer | 2 | Justin | Completed |
| #16 View Sent Offers | 3 | Gurleen | Completed |

---

## Practices to Continue Next Sprint

- Beginning the implementation for user stories well before the due date  
- Writing clear branch names associated with tasks and creating pull requests for main  
- Breaking user stories into small, clearly defined tasks and assigning them according to team members’ expertise  
- Adding and updating acceptance criteria or tasks for each user story on Trello and in documentation  
- Carefully reusing and building on existing components to make implementation more efficient  

---

## New Practices to Try Next Sprint

- Start implementing user stories even earlier to leave enough time for testing at the end of the sprint, considering we will be implementing a lot more features in the next sprint 
- Review code more thoroughly before merging to main  
- Agree on prop names, route strings, and naming conventions as a team before building pages  

---

## Harmful Practices to Stop

- Carelessly copy-pasting code without updating variable names, route strings, and prop names to match the new context  
- Inconsistent naming across frontend and backend (e.g., route names not matching page names)  

---

## Best/Worst Experiences During Sprint 2

**Isha:**  
My best experience during Sprint 2 was seeing the filtering and browsing flow come together across different parts of the application. It was really satisfying to get the homepage category section, listings page filters, and navigation between pages flowing smoothly while handling edge cases. My worst experience was debugging the filter state, especially making sure that when going from the listings page to a listing details page and back, the selected filters (especially the category filtering) would still stay applied instead of resetting.

**Raymond:**  
My best experience during Sprint 2 was working with the frontend in getting the navigation between pages working properly, particularly the back navigation between Listings, My Listings, and the Listing Details page. For my worst experience, it was debugging navigation issues caused by our routing setup since we’re using a shared page state instead of a routing library.

**Gurleen:**  
Since the last sprint, I have gained more experience with frontend and backend development. This allowed me to completely implement two user stories end to end on my own, which was very rewarding. The worst experience was definitely debugging some navigation bugs caused by mismatched route names and props being improperly passed, since we were reusing a lot of code related to showing a listing’s information across pages. 

**Andrei:**  
My best experience during this sprint was seeing how my task implementations worked with the rest of my group members. Seeing the tasks I worked on function properly after bug fixing is also another good experience. My worst experience was bug fixing, specifically the bug where a deleted listing would cause the whole MyOffers page to not load.

**Justin:**  
My best experience would undoubtedly be seeing the offer flow come together end-to-end, especially after fixing the Make Offer and Cancel Offer features and confirming they worked correctly in the UI. Although frustrating at times, resolving problems and seeing the end product working correctly felt very rewarding. As for my worst experience, I would say it was dealing with task dependencies since some tasks were already partially covered while others depended on teammates’ work, which made it difficult to keep every PR aligned with the rubric. Still, I tried my best to adhere to it, and made comments on the specific tasks on the Trello board where I encountered difficulties.
