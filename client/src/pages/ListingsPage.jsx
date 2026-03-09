import { useState, useEffect } from "react";
import api from "../lib/axios";

//US-07-1: display all listings
const ListingsPage = ({ setPage, setSelectedId }) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/api/listings");
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
      <button onClick={() => setPage("home")}>Back to Home</button>

      <h1>All Listings</h1>

      {error && <p>{error}</p>}
      {listings.length === 0 && !error && <p>No listings found.</p>}

      {listings.map((listing) => (
        <div key={listing._id} style={{ marginBottom: "20px" }}>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <p><strong>Category:</strong> {listing.category}</p>
          <p><strong>Price:</strong> ${listing.price}</p>

          <button onClick={() => { setSelectedId(listing._id); setPage("listing-details"); }}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListingsPage;