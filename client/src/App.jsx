import React, { useState } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";

function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      {page === "home" && <Home setPage={setPage} />}
      {page === "signin" && <SignIn setPage={setPage} />}
      {page === "signup" && <SignUp setPage={setPage} />}
      {page === "listings" && <ListingsPage setPage={setPage} setSelectedId={setSelectedId} />}
      {page === "listing-details" && <ListingDetailsPage id={selectedId} setPage={setPage} />}
    </div>
  );
}

export default App;
