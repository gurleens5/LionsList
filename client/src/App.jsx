import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import CreateListingPage from "./pages/CreateListingPage";
import api from "./lib/axios";

function App() {
  const [page, setPage] = useState("home");
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get('/me', {
            headers: {Authorization: `Bearer ${token}`}
          })
          setUser(res.data)
        } catch (err) {
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {page === "home" && <Home setPage={setPage} />}
<<<<<<< HEAD
      {page === "signin" && <SignIn setPage={setPage} setUser={setUser}/>}
      {page === "signup" && <SignUp setPage={setPage} setUser={setUser}/>}
      {page === "listings" && (
        <ListingsPage
          setPage={setPage}
          setSelectedListingId={setSelectedListingId}
        />
      )}
      {page === "listingDetails" && (
        <ListingDetailsPage
          setPage={setPage}
          listingId={selectedListingId}
        />
      )}
=======
      {page === "signin" && <SignIn setPage={setPage} setUser={setUser} />}
      {page === "signup" && <SignUp setPage={setPage} setUser={setUser} />}
      {page === "listings" && <ListingsPage setPage={setPage} setSelectedId={setSelectedId} />}
      {page === "listing-details" && <ListingDetailsPage id={selectedId} setPage={setPage} />}
      {page === "create-listing" && <CreateListingPage setPage={setPage} />}
>>>>>>> origin/main
    </div>
  );
}

export default App;
