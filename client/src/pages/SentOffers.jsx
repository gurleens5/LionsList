import Header from "../components/Header";
import { useEffect, useState } from "react";
import api from "../lib/axios";

  
function SentOffers({ setPage }) {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  
  //fetch listings by the logged-in user
  useEffect(() => {
  const fetchSentOffers = async () => {
    try {
      const res = await api.get("/offers/sent", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOffers(res.data);
    } catch (err) {
      console.error("Error fetching sent offers:", err);
      setError("Failed to load your offers.");
    }
  };

  if (token) {
    fetchSentOffers();
  }
}, [token]);


return (
  <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
    <Header setPage={setPage} />
    <div style={{ height: "70px" }} />
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1.5rem", fontSize: "2.2rem", fontWeight: "800", color: "#111" }}>
        Sent Offers
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
        {offers.length === 0 && (
          <p style={{ color: "#626161", fontSize: "1.1rem" }}>You haven't made any offers yet.</p>
        )}

        {offers.map((offer) => (
          <div key={offer._id} style={{ width: "320px", minHeight: "470px", background: "#fff", borderRadius: "14px",
            overflow: "hidden", border: "1px solid #ddd", display: "flex", flexDirection: "column" }}>

            <div style={{ height: "180px", background: "#d9d9d9", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#666", fontWeight: "600" , position: "relative"}}>
              {offer.listing.imageUrl ? (
                <img src={offer.listing.imageUrl} alt={offer.listing.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                "No Image"
              )}

              <span style={{
                position: "absolute", top: "10px", right: "10px",
                backgroundColor: offer.status === "Pending" ? "#fff3cd" : offer.status === "Accepted" ? "#d4edda" : "#f8d7da",
                color: offer.status === "Pending" ? "#856404" : offer.status === "Accepted" ? "#155724" : "#721c24",
                padding: "0.2rem 0.6rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.85rem",
              }}>
                {offer.status}
              </span>
            </div>

            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#111", fontSize: "1.4rem", minHeight: "68px" }}>
                {offer.listing.title}
              </h3>

              <p style={{ color: "#444", marginBottom: "0.75rem", lineHeight: "1.6", minHeight: "110px" }}>
                {offer.listing.description}
              </p>

              <p style={{ margin: "0.3rem 0" }}>
                <strong>Category:</strong> {offer.listing.category}
              </p>

              {offer.listing.courseCode && (
                <p style={{ margin: "0.3rem 0 1rem 0" }}>
                  <strong>Course Code:</strong> {offer.listing.courseCode}
                </p>
              )}

              <p style={{ margin: "0.3rem 0" }}>
                <strong>Listed Price:</strong> ${offer.listing.price}
              </p>

              <p style={{ margin: "0.3rem 0" }}>
                <strong>Your Offer:</strong> ${offer.amount}
              </p>

              <p style={{ margin: "0.3rem 0 1rem 0" }}>
                <strong>Status:</strong>{" "}
                <span style={{
                  backgroundColor: offer.listing.status === "Available" ? "#d4edda" : "#eee",
                  color: offer.listing.status === "Available" ? "#155724" : "#555",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "6px",
                  fontWeight: "700",
                  fontSize: "0.85rem"
                }}>
                  {offer.listing.status}
                </span>
              </p>

              <button
                onClick={() => {
                  setPage("sent-offers-details", offer._id)
                }}
                style={{ background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px",
                  padding: "0.8rem 1.2rem", fontWeight: "700", cursor: "pointer",
                  fontFamily: "Georgia, serif", width: "100%", marginTop: "auto" }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default SentOffers; 