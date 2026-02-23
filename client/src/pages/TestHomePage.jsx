import React from 'react'
import { Link } from 'react-router';
import axios from "axios";

const TestHomePage = () => {
  //return <div>TestHomePage</div>
    const createObject = async () => {
    try {
      const newObject = {
        title: "Object",
        content: "check timestamp",
      };
      const res = await axios.post("http://localhost:4000/", newObject);
      console.log("Created object:", res.data);

    } catch (error) {
      console.error("Error creating object:", error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={createObject}>Create Object</button>

      <Link to="/testobjects">
        <button>View Stored Objects</button>
      </Link>
    </div>
  );
}

export default TestHomePage