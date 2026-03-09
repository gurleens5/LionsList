import React, { useState } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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