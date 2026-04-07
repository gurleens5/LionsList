import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../lib/axios";

function ProfilePage({ setPage, user, profileUserId }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userIdToFetch = profileUserId || user?._id; 

      if (!userIdToFetch) {
        setError("No user found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(`/users/${userIdToFetch}`);
        setProfileData(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, profileUserId]);

  const displayUsername = profileData?.username || "username";

  const displaySellerRating =
    profileData?.sellerRating !== undefined
      ? profileData.sellerRating.toFixed(1)
      : "0.0";

  const displaySellerRatingsCount = profileData?.sellerRatingsCount ?? 0;

  const displayBuyerRating =
    profileData?.buyerRating !== undefined
      ? profileData.buyerRating.toFixed(1)
      : "0.0";

  const displayBuyerRatingsCount = profileData?.buyerRatingsCount ?? 0;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <Header setPage={setPage} />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "110px 20px 40px",
          fontFamily: "Georgia, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "28px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              marginBottom: "24px",
              fontSize: "2rem",
              color: "#111",
            }}
          >
            User Profile
            
          </h1>

          {loading ? (
            <p style={{ color: "#666" }}>Loading profile...</p>
          ) : error ? (
            <p style={{ color: "#cc0000" }}>{error}</p>
          ) : (
            <>
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "#111",
                  }}
                >
                  {displayUsername}
                </div>
                <div style={{ color: "#666", marginTop: "6px" }}>
                  YorkU marketplace user
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fafafa",
                    border: "1px solid #e3e3e3",
                    borderRadius: "10px",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    Seller Rating
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      color: "#111",
                    }}
                  >
                    {displaySellerRating}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#fafafa",
                    border: "1px solid #e3e3e3",
                    borderRadius: "10px",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    Seller Ratings Count
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      color: "#111",
                    }}
                  >
                    {displaySellerRatingsCount}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#fafafa",
                    border: "1px solid #e3e3e3",
                    borderRadius: "10px",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    Buyer Rating
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      color: "#111",
                    }}
                  >
                    {displayBuyerRating}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#fafafa",
                    border: "1px solid #e3e3e3",
                    borderRadius: "10px",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    Buyer Ratings Count
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      color: "#111",
                    }}
                  >
                    {displayBuyerRatingsCount}
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#fafafa",
                  border: "1px solid #e3e3e3",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: "12px",
                    fontSize: "1.2rem",
                    color: "#111",
                  }}
                >
                  Ratings and Reviews
                </h2>

                <p style={{ margin: 0, color: "#666" }}>
                  No ratings yet.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;