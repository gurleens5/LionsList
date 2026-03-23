import { useEffect, useState } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const SentOffersDetails = ({ setPage, offerId, user }) => {
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState("");

  const [cancelError, setCancelError] = useState("");
  const [cancelSuccess, setCancelSuccess] = useState("");
  const [cancellingOffer, setCancellingOffer] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await api.get(`/offers/${offerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOffer(res.data);
      } catch (err) {
        console.error("Error fetching offer details:", err);
        setError("Failed to load offer details.");
      }
    };

    if (offerId) fetchOffer();
  }, [offerId]);

  const handleCancelOffer = async () => {
    if (!offerId || !token) {
      setCancelError("Unable to cancel this offer.");
      return;
    }
  
    try {
      setCancellingOffer(true);
      setCancelError("");
      setCancelSuccess("");
  
      const res = await api.patch(`/offers/${offerId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOffer((prev) => (prev ? { ...prev, status: res.data.status } : prev ));
      setCancelSuccess("Offer cancelled successfully.");
    } catch (err) {
      console.error("Error cancelling offer:", err);
      setCancelError(err.response?.data?.message || "Failed to cancel offer.");
    } finally {
      setCancellingOffer(false);
    }
  };

  const listing = offer?.listing;

  return (
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div style={{
          position: "relative",
          background: "#fff",
          borderRadius: "14px",
          padding: "2rem",
          width: "100%",
          maxWidth: "750px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          <button
            onClick={() => setPage("sent-offers")}
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
            ← Back to Sent Offers
          </button>

          {error && <p style={{ color: "#cc0000" }}>{error}</p>}
          {!error && !offer && <p>Loading...</p>}

          {offer && listing && (
            <div>
              <h1 style={{ marginTop: 0, marginBottom: "1rem", color: "#111" }}>
                {listing.title}
              </h1>

              <p style={{ lineHeight: "1.8", color: "#444" }}>
                <strong>Description:</strong> {listing.description}
              </p>

              <p><strong>Category:</strong> {listing.category}</p>
              {listing.courseCode && (
                  <p><strong>Course Code:</strong> {listing.courseCode}</p>
              )}
              <p><strong>Listed Price:</strong> ${listing.price}</p>
              <p><strong>Listing Status:</strong> {listing.status}</p>
              <p><strong>Seller:</strong> {listing.sellerUsername || "Unknown"}</p>

              <small style={{ color: "#666" }}>
                Created: {new Date(listing.createdAt).toLocaleString()}
              </small>

              <div style={{
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #ddd"
              }}>
                <h2 style={{ marginTop: 0, marginBottom: "1rem", color: "#111" }}>Your Offer</h2>
                <p><strong>Offer Amount:</strong> ${offer.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {offer.status}</p>

                {cancelError && <p style={{ color: "#cc0000", marginTop: "0.75rem" }}>{cancelError}</p>}
                {cancelSuccess && <p style={{ color: "#28a745", marginTop: "0.75rem" }}>{cancelSuccess}</p>}

                <div style={{ marginTop: "1rem" }}>
                  <button
                    onClick={handleCancelOffer}
                    disabled={cancellingOffer}
                    style={{
                      background: "#cc0000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "0.8rem 1.2rem",
                      fontWeight: "700",
                      cursor: cancellingOffer ? "not-allowed" : "pointer",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {cancellingOffer ? "Cancelling..." : "Cancel Offer"}
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentOffersDetails;