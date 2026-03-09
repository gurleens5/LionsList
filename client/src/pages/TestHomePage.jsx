import React from 'react'
import { Link } from 'react-router';
import api from "../lib/axios";

const TestHomePage = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  //return <div>TestHomePage</div>
    const createObject = async () => {
    try {
      const newObject = {
        title: "Object",
        content: "check timestamp",
      };
      const res = await api.post("/", newObject);
      console.log("Created object:", res.data);

    } catch (error) {
      console.error("Error creating object:", error);
    }
  };

  //US-03-T5: add logout UI
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    delete api.defaults.headers.common["Authorization"];
    window.location.href = "/"; // Redirect to home page after logout
  }

  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={createObject}>Create Object</button>

      <Link to="/testobjects">
        <button>View Stored Objects</button>
      </Link>

      <Link to="/listings">
        <button>View Listings</button>
      </Link>

      {isLoggedIn && <button onClick = {handleLogout}>Log Out</button>}
    </div>
  );
}

export default TestHomePage