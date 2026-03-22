import { useEffect, useState } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const ListingDetailsPage = ({ setPage, listingId, user }) => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerError, setOfferError] = useState("");
  const [offerSuccess, setOfferSuccess] = useState("");
  const [submittingOffer, setSubmittingOffer] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

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

  const sellerId = listing?.seller && typeof listing.seller === "object" ? listing.seller._id : listing?.seller;

  const isSeller = user && sellerId && String(user._id) === String(sellerId);

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    setOfferError("");
    setOfferSuccess("");

    const trimmedAmount = offerAmount.trim();
    const numericAmount = Number(trimmedAmount);

    if (!trimmedAmount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setOfferError("Offer amount must be a positive number.");
      return;
    }

    if (!listing?._id) {
      setOfferError("Listing not found.");
      return;
    }

    if (!token) {
      setOfferError("You must be logged in to make an offer.");
      return;
    }

    try {
      setSubmittingOffer(true);

      await api.post(
        "/offers",
        {
          listingId: listing._id,
          amount: numericAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOfferSuccess("Offer submitted successfully.");
      setOfferAmount("");
      setShowOfferForm(false);
    } catch (err) {
      console.error("Error submitting offer:", err);
      setOfferError(err.response?.data?.message || "Failed to submit offer.");
    } finally {
      setSubmittingOffer(false);
    }
  };

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
                {isLoggedIn && !isSeller && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowOfferForm((prev) => !prev);
                      setOfferError("");
                      setOfferSuccess("");
                    }}
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
                    {showOfferForm ? "Cancel" : "Make Offer"}
                  </button>
                )}

                <small style={{ color: "#666" }}>
                  Created: {new Date(listing.createdAt).toLocaleString()}
                </small>
              </div>

              {isLoggedIn && !isSeller && showOfferForm && (
                <form onSubmit={handleOfferSubmit} style={{ marginTop: "1rem" }}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <label htmlFor="offerAmount">
                      <strong>Offer Amount</strong>
                    </label>
                  </div>

                  <input
                    id="offerAmount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="Enter offer amount"
                    style={{
                      padding: "0.5rem",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "200px",
                      maxWidth: "100%",
                    }}
                  />

                  <div style={{ marginTop: "0.75rem" }}>
                    <button
                      type="submit"
                      disabled={submittingOffer}
                      style={{
                        background: "#cc0000",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {submittingOffer ? "Submitting..." : "Submit Offer"}
                    </button>
                  </div>
                </form>
              )}

              {offerError && (
                <p style={{ color: "#cc0000", marginTop: "0.75rem" }}>
                  {offerError}
                </p>
              )}

              {offerSuccess && (
                <p style={{ color: "green", marginTop: "0.75rem" }}>
                  {offerSuccess}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;