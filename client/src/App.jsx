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

function App() {
    const [page, setPage] = useState("home");
    const [selectedListingId, setSelectedListingId] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [homeSearch, setHomeSearch] = useState("");

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

  return (
    <div>
      {page === "home" && <Home setPage={setPage} setHomeSearch={setHomeSearch} />}
      {page === "signin" && <SignIn setPage={setPage} setUser={setUser}/>}
      {page === "signup" && <SignUp setPage={setPage} setUser={setUser}/>}
      {page === "create-listing" && (user ? <MyListingsPage setPage={setPage} /> : setPage("signin"))}
      {page === "sent-offers" && (user ? <SentOffers setPage={setPage} /> : setPage("signin"))}
      {page === "listings" && (
        <ListingsPage
          setPage={setPage}
          setSelectedListingId={setSelectedListingId}
          homeSearch={homeSearch}
        />
      )}
      {page === "listing-details" && (
        <ListingDetailsPage
          setPage={setPage}
          listingId={selectedListingId}
          user={user}
        />
        
      )}

      {page === "my-listings" && (
        user ? (
          <MyListingsPage
            setPage={setPage}
            setSelectedListingId={setSelectedListingId}
          />
        ) : (
          setPage("signin")
        )
      )}
    </div>
  );
}

export default App;
