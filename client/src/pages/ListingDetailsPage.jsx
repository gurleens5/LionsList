import { useEffect, useState } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

// US-07-2, US-07-3, US-07-4: display listing details and seller info
const ListingDetailsPage = ({ setPage, listingId }) => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/api/listings/${listingId}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        setError("Failed to load listing details.");
      }
    };

    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  return (
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", width: "100%", maxWidth: "750px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
        >
          <button
            onClick={() => setPage("listings")}
            style={{ background: "transparent", border: "none", color: "#cc0000", fontWeight: "700", cursor: "pointer",
                    marginBottom: "1rem", padding: 0, fontFamily: "Georgia, serif",
            }}
          >
            ← Back to Listings
          </button>

          {error && <p style={{ color: "#cc0000" }}>{error}</p>}
          {!error && !listing && <p>Loading...</p>}

          {listing && (
            <div>
              <h1 style={{ marginTop: 0, marginBottom: "1rem", color: "#111" }}>
                {listing.title}
              </h1>

              <p style={{ lineHeight: "1.8", color: "#444" }}>
                <strong>Description:</strong> {listing.description}
              </p>

              <p><strong>Category:</strong> {listing.category}</p>
              <p><strong>Price:</strong> ${listing.price}</p>
              <p><strong>Status:</strong> {listing.status}</p>
              <p><strong>Seller:</strong> {listing.sellerUsername || "Unknown"}</p>

              <small style={{ color: "#666" }}>
                Created: {new Date(listing.createdAt).toLocaleString()}
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;