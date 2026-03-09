import React, { useState } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import ListingsPage from "./pages/ListingsPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";

const App = () => {
  return <div>
      <Routes>
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetailsPage />} />
      </Routes>
      </div>
function App() {
  const [page, setPage] = useState("home");
  return (
    <div>
      {page === "home" && <Home setPage={setPage} />}
      {page === "signin" && <SignIn setPage={setPage} />}
      {page === "signup" && <SignUp setPage={setPage} />}
    </div>
  );
}

export default App;