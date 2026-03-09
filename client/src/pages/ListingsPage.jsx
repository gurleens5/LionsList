import { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../lib/axios";

//US-07-1: display all listings
const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to load listings.");
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>

      <h1>All Listings</h1>

      {error && <p>{error}</p>}
      {listings.length === 0 && !error && <p>No listings found.</p>}

      {listings.map((listing) => (
        <div key={listing._id} style={{ marginBottom: "20px" }}>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <p><strong>Category:</strong> {listing.category}</p>
          <p><strong>Price:</strong> ${listing.price}</p>

          <Link to={`/listings/${listing._id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListingsPage;