import { useState, useEffect } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

// US-07-1: display all listings
const ListingsPage = ({ setPage, setSelectedListingId }) => {
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
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}
    >
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "1.5rem", fontSize: "2.2rem", fontWeight: "800", color: "#111" }}
        >
          Browse Listings
        </h1>

        {error && <p style={{ color: "#cc0000" }}>{error}</p>}
        {listings.length === 0 && !error && <p>No listings found.</p>}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}
        >
          {listings.map((listing) => (
            <div key={listing._id} style={{ width: "320px", background: "#fff", borderRadius: "14px", 
              overflow: "hidden", border: "1px solid #ddd" }}
            >
              <div style={{ height: "180px", background: "#d9d9d9", display: "flex", alignItems: "center",
                            justifyContent: "center", color: "#666", fontWeight: "600" }}
              >
                {listing.imageUrl ? (
                  <img src={listing.imageUrl} alt={listing.title}
                       style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  "No Image"
                )}
              </div>

              <div style={{ padding: "1.25rem" }}>
                <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#111", fontSize: "1.4rem" }}
                >
                  {listing.title}
                </h3>

                <p style={{ color: "#444", marginBottom: "0.75rem", lineHeight: "1.6", minHeight: "72px" }}
                >
                  {listing.description}
                </p>

                <p style={{ margin: "0.3rem 0" }}>
                  <strong>Category:</strong> {listing.category}
                </p>

                <p style={{ margin: "0.3rem 0 1rem 0" }}>
                  <strong>Price:</strong> ${listing.price}
                </p>

                <button onClick={() => { setSelectedListingId(listing._id); setPage("listingDetails"); }}
                        style={{ background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px",
                                 padding: "0.8rem 1.2rem", fontWeight: "700", cursor: "pointer",
                                 fontFamily: "Georgia, serif", width: "100%" }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;