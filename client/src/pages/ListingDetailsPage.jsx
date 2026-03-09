import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../lib/axios";

//US-07-1/2/3: display listing details and seller info
const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        setError("Failed to load listing details.");
      }
    };

    fetchListing();
  }, [id]);

  return (
    <div>
      <Link to="/listings">
        <button>Back to Listings</button>
      </Link>

      <h1>Listing Details</h1>

      {error && <p>{error}</p>}

      {!error && !listing && <p>Loading...</p>}

      {listing && (
        <div>
          <h2>{listing.title}</h2>
          <p><strong>Description:</strong> {listing.description}</p>
          <p><strong>Category:</strong> {listing.category}</p>
          <p><strong>Price:</strong> ${listing.price}</p>
          <p><strong>Status:</strong> {listing.status}</p>
          <p><strong>Seller:</strong> {listing.sellerUsername || "Unknown"}</p>
          <small>
            Created: {new Date(listing.createdAt).toLocaleString()}
          </small>
        </div>
      )}
    </div>
  );
};

export default ListingDetailsPage;