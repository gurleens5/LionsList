import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import CreateListingPage from "./pages/CreateListingPage";
import MyListingsPage from "./pages/MyListingsPage";
import SentOffers from "./pages/SentOffers";
import api from "./lib/axios";
import EditListingPage from "./pages/EditListingPage";
import SentOffersDetails from "./pages/SentOffersDetails";
import TransactionsPage from "./pages/TransactionsPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";

function App() {
    const [page, setPage] = useState("home");
    const [selectedListingId, setSelectedListingId] = useState(null);
    const [previousPage, setPreviousPage] = useState("listings");
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [homeSearch, setHomeSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [courseCodeInput, setCourseCodeInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedProfileUserID, setSelectedProfileUserID] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
              setUser(null);
              setError("");
              return;
            }
            
            try {
                const res = await api.get('/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
                setError("");
            } catch (err) {
                setError("Failed to fetch user data");
                localStorage.removeItem("token");
                setUser(null);
            }
        };
        fetchUser();
    }, [page]);


  const handleSetPage = (newPage, idOrFrom) => {
    if (newPage === "listings" && idOrFrom !== "listing-details" && idOrFrom !== "homepage-category") {
      setSelectedCategories([]);
      setCourseCodeInput("");
      setSearchQuery("");
      setSearchInput("");
    }
    if (newPage === "sent-offers-details" || newPage === "listing-details" || newPage === "edit-listing") {
      setSelectedListingId(idOrFrom);
    }
    if (newPage === "profile") {
      setSelectedProfileUserID(idOrFrom || null);
    }
    setPage(newPage);
  };

  return (
    <div>
      {page === "home" && (
        <Home
          setPage={handleSetPage}
          setHomeSearch={setHomeSearch}
          setSelectedCategories={setSelectedCategories}
          setCourseCodeInput={setCourseCodeInput}
        />
      )}

      {page === "signin" && <SignIn setPage={handleSetPage} setUser={setUser} />}
      {page === "signup" && <SignUp setPage={handleSetPage} setUser={setUser} />}
      {page === "create-listing" && (
        user ? (
          <CreateListingPage setPage={handleSetPage} />
        ) : (
          handleSetPage("signin")
        )
      )}
      {page === "sent-offers" && (user ? <SentOffers setPage={handleSetPage} /> : handleSetPage("signin"))}
      {page === "listings" && (
        <ListingsPage
          setPage={handleSetPage}
          setSelectedListingId={setSelectedListingId}
          setPreviousPage={setPreviousPage}
          homeSearch={homeSearch}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          courseCodeInput={courseCodeInput}
          setCourseCodeInput={setCourseCodeInput}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setHomeSearch={setHomeSearch}
        />
      )}
      {page === "listing-details" && (
        <ListingDetailsPage
          setPage={handleSetPage}
          listingId={selectedListingId}
          previousPage={previousPage}
          user={user}
        />
        
      )}

      {page === "my-listings" && (
        user ? (
          <MyListingsPage
            setPage={handleSetPage}
            setSelectedListingId={setSelectedListingId}
            setPreviousPage={setPreviousPage}
          />
        ) : (
          handleSetPage("signin")
        )
      )}

      {page === "edit-listing" && (
        <EditListingPage
          setPage={handleSetPage}
          listingId={selectedListingId}
          previousPage={previousPage}
          user={user}
        />
      )}

      {page === "sent-offers-details" && (
        <SentOffersDetails
          setPage={handleSetPage}
          offerId={selectedListingId}
          user={user}
        />
      )}

      {page === "history" && (
        user ? (
          <TransactionsPage
            setPage={setPage}
            user={user}
          />
        ) : (
          setPage("signin")
        )
      )}

      {page === "profile" && (
        user ? (
          <ProfilePage
            setPage={handleSetPage}
            user={user}
            profileUserId={selectedProfileUserID}
          />
        ) : (
          handleSetPage("signin")
        )
      )}
      
      {page === "messages" && (
        user ? (
          <MessagesPage setPage={handleSetPage} user={user} />
        ) : (
          handleSetPage("signin")
        )
      )}

    </div>
  );
}

export default App;
