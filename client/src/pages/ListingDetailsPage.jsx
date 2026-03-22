import { useEffect, useState } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const ListingDetailsPage = ({ setPage, listingId, user }) => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");
  const [offers, setOffers] = useState([]);
  const [offersError, setOffersError] = useState("");

  const isLoggedIn =  !!localStorage.getItem("token");
  const isSeller   =  !!user && !!listing?.seller?._id && 
                        String(user._id) === String(listing.seller._id);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${listingId}`);
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

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/offers/listing/${listingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOffers(res.data);
        setOffersError("");
      } catch (err) {
        console.error("Error fetching offers:", err);
        setOffersError("Failed to load offers for this listing.");
      }
    };

    if (listingId && isSeller) {
      fetchOffers();
    }
  }, [listingId, isSeller]);

  return (
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div 
          style={{ 
            background: "#fff",
            borderRadius: "14px",
            padding: "2rem",
            width: "100%",
            maxWidth: "750px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)" 
          }}
        >
          <button
            onClick={() => setPage("listings")}
            style={{ 
              background: "transparent",
              border: "none",
              color: "#cc0000",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "1rem",
              padding: 0,
              fontFamily: "Georgia, serif",
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
              <p><strong>Course Code:</strong> {listing.courseCode}</p>
              <p><strong>Price:</strong> ${listing.price}</p>
              <p><strong>Status:</strong> {listing.status}</p>
              <p><strong>Seller:</strong> {listing.sellerUsername || "Unknown"}</p>

              <div 
                style={{ 
                  marginTop: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {isLoggedIn && (
                  <button
                    type="button"
                    style={{ 
                      background: "#cc0000",
                      color: "#fff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      cursor: "pointer", 
                      fontWeight: "700",
                      fontFamily: "Georgia, serif",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    Make Offer
                  </button>
                )}

                <small style={{ color: "#666" }}>
                  Created: {new Date(listing.createdAt).toLocaleString()}
                </small>
              </div>

              {isSeller && (
                <div 
                  style={{ 
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #ddd"
                  }}
                >
                  <h2 style={{ marginTop: 0, marginBottom: "1rem", color: "#111" }}>
                    Offers Received
                  </h2>

                  {offersError && <p style={{ color: "#cc0000" }}>{offersError}</p>}

                  {!offersError && offers.length === 0 && (
                    <p style={{ color: "#444" }}>No offers received yet.</p>
                  )}

                  {offers.map((offer) => (
                    <div 
                      key={offer._id}
                      style={{ 
                        background: "#f8f8f8",
                        borderRadius: "10px",
                        padding: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <p><strong>Buyer:</strong> {offer.buyer?.username || "Unknown"}</p>
                      <p><strong>Offer Amount:</strong> ${offer.amount.toFixed(2)}</p>
                      <p><strong>Status:</strong> {offer.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;