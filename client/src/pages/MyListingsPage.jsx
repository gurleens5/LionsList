import { useEffect, useState } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const MyListingsPage = ({ setPage, setSelectedListingId }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get("/listings/my", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setListings(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load your listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  const noListings = !loading && listings.length === 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e6e4e4",
        fontFamily: "Georgia, sans-serif",
      }}
    >
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem" }}>
        <h1
          style={{
            marginBottom: "1.5rem",
            fontSize: "2.2rem",
            fontWeight: "800",
            color: "#111",
          }}
        >
          My Listings
        </h1>

        {error && <p style={{ color: "#cc0000" }}>{error}</p>}

        {loading && <p>Loading listings...</p>}

        {noListings && (
          <p style={{ color: "#cc0000", fontWeight: "700" }}>
            You have not created any listings yet
          </p>
        )}

        {!noListings && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {listings.map((listing) => (
              <div
                key={listing._id}
                style={{
                  width: "320px",
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1px solid #ddd",
                  padding: "1.25rem",
                }}
              >
                <h3 style={{ marginBottom: "0.5rem" }}>
                  {listing.title}
                </h3>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        listing.status === "Available"
                          ? "green"
                          : "#555",
                      fontWeight: "700",
                    }}
                  >
                    {listing.status}
                  </span>
                </p>

                <p>
                  <strong>Price:</strong> ${listing.price}
                </p>

                <button
                  onClick={() => {
                    setSelectedListingId(listing._id);
                    setPage("listing-details");
                  }}
                  style={{
                    marginTop: "1rem",
                    background: "#cc0000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.6rem 1rem",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;