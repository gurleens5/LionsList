import { useEffect, useState } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const ListingDetailsPage = ({ setPage, listingId, user, previousPage }) => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");
  const [offers, setOffers] = useState([]);
  const [offersError, setOffersError] = useState("");

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

  useEffect(() => {
    const fetchOffers = async () => {
      try {
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

    if (listingId && isSeller && token) {
      fetchOffers();
    }
  }, [listingId, isSeller, token]);

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

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmed) return;
    
    try {
    const token = localStorage.getItem("token");

    await api.delete(`/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setPage("listings");

    } catch (err) {
      console.error("Delete failed: ", err);
      alert("Failed to delete listing.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div 
          style={{ 
            position: "relative",
            background: "#fff",
            borderRadius: "14px",
            padding: "2rem",
            width: "100%",
            maxWidth: "750px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)" 
          }}
        >
          <button
            onClick={() => setPage(previousPage || "listings")}
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
            ← Back to {previousPage === "my-listings" ? "My Listings" : "Listings"}
          </button>

           {isSeller && (
            <button
              onClick={() => setPage("edit-listing", listing._id)}
              style={{
                position: "absolute",
                right: 30,
                top: 35,
                background: "none",
                border: "none",
                color: "#cc0000",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "600",
                fontFamily: "Georgia, serif",
                padding: 0
              }}
            >
              Edit
            </button>
          )}

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
              {listing.courseCode && (
              <p><strong>Course Code:</strong> {listing.courseCode}</p>)}
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

                <button
                  onClick={handleDelete}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#cc0000",
                    cursor: "pointer",
                    fontWeight: "700",
                    textDecoration: "underline",
                    fontFamily: "Georgia, serif",
                    marginLeft: "10px"
                  }}
                >
                  Delete
                </button>

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
                      fontFamily: "Georgia, serif",
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