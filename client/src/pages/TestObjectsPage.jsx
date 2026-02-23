import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from "axios";

const TestObjectsPage = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const res = await axios.get("http://localhost:4000/testobjects");
        console.log(res.data);
        setObjects(res.data);
      } catch (error) {
        console.error("Error fetching objects:", error);
      }
    };

    fetchObjects();
  }, []);
    
  return (
    <div>
        <Link to="/">
            <button>Back to Home</button>
        </Link>
        <h1>All Objects</h1>
            {objects.length === 0 && <p>No objects found.</p>}
            {objects.map(obj => (
        <div key={obj._id} style={{ marginBottom: "20px" }}>
          <h3>{obj.title}</h3>
          <p>{obj.content}</p>
          <small>{new Date(obj.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default TestObjectsPage