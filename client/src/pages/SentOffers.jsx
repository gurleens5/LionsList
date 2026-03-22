import Header from "../components/Header";
import { useEffect, useState } from "react";

function SentOffers({ setPage }) {
  
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
      </div>
    </div>
  );
}

export default SentOffers; 