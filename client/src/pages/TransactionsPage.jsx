import { useState, useEffect } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const TransactionsPage = ({ setPage, user }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [ratingTarget, setRatingTarget] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);

  const [sellerRatingTarget, setSellerRatingTarget] = useState(null);
  const [sellerRatingValue, setSellerRatingValue] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get("/transactions/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleSubmitBuyerRating = async () => {
    if (!ratingValue || !ratingTarget) return;

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/transactions/rate/buyer",
        {
          transactionId: ratingTarget._id,
          rating: ratingValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedTransaction = res.data.transaction;

      setTransactions((prev) =>
        prev.map((tx) =>
          tx._id === updatedTransaction._id
            ? { ...tx, buyerRating: updatedTransaction.buyerRating }
            : tx
        )
      );

      setRatingTarget(null);
      setRatingValue(0);

      alert("Buyer rated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit rating");
    }
  };

  const handleSubmitSellerRating = async () => {
    if (!sellerRatingValue || !sellerRatingTarget) return;

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/transactions/rate/seller",
        {
          transactionId: sellerRatingTarget._id,
          rating: sellerRatingValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedTransaction = res.data.transaction;

      setTransactions((prev) =>
        prev.map((tx) =>
          tx._id === updatedTransaction._id
            ? { ...tx, sellerRating: updatedTransaction.sellerRating }
            : tx
        )
      );

      setSellerRatingTarget(null);
      setSellerRatingValue(0);

      alert("Seller rated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit seller rating");
    }
  };

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
          History
        </h1>

        {error && <p style={{ color: "#cc0000" }}>{error}</p>}
        {loading && <p>Loading transactions...</p>}

        {!loading && !error && transactions.length === 0 && (
          <p
            style={{
              color: "#cc0000",
              fontWeight: "700",
              fontSize: "1.1rem",
            }}
          >
            You have no completed transactions yet.
          </p>
        )}

        {!loading && transactions.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              alignItems: "flex-start",
            }}
          >
            {transactions.map((tx) => {
              const isBuyer = user && tx.buyer?._id === user._id;
              const isSeller = user && tx.seller?._id === user._id;

              const canRateBuyer =
                isSeller &&
                tx.offer?.status === "Accepted" &&
                !tx.buyerRating;

              const canRateSeller =
                isBuyer &&
                tx.offer?.status === "Accepted" &&
                !tx.sellerRating;

              const label = isBuyer ? "Purchased" : "Sold";
              const formattedDate = new Date(tx.createdAt).toLocaleString();

              const bgColor = isBuyer ? "#dbeafe" : "#fff4e5";
              const textColor = isBuyer ? "#1e3a8a" : "#9a3412";

              return (
                <div
                  key={tx._id}
                  style={{
                    width: "320px",
                    minHeight: "470px",
                    background: "#fff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      height: "180px",
                      background: "#d9d9d9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      fontWeight: "600",
                      position: "relative",
                    }}
                  >
                    {tx.listing?.imageUrl ? (
                      <img
                        src={tx.listing.imageUrl}
                        alt={tx.listing.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}

                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: bgColor,
                        color: textColor,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "6px",
                        fontWeight: "700",
                        fontSize: "0.85rem",
                      }}
                    >
                      {label} {formattedDate}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        marginTop: 0,
                        marginBottom: "0.75rem",
                        color: "#111",
                        fontSize: "1.4rem",
                        minHeight: "68px",
                      }}
                    >
                      {tx.listing?.title || "Listing"}
                    </h3>

                    <p style={{ margin: "0.3rem 0" }}>
                      <strong>{isBuyer ? "Seller" : "Buyer"}:</strong>{" "}
                      {isBuyer ? tx.seller?.username : tx.buyer?.username}
                    </p>

                    <div style={{ height: "8px" }} />

                    <p style={{ margin: "0.3rem 0" }}>
                      <strong>{isBuyer ? "Listed Price" : "Your Price"}:</strong>{" "}
                      ${tx.listing?.price}
                    </p>

                    <p style={{ margin: "0.3rem 0" }}>
                      <strong>{isBuyer ? "Your Offer" : "Offer Price"}:</strong>{" "}
                      ${tx.offer?.amount?.toFixed(2)}
                    </p>

                    {isBuyer &&
                      (canRateSeller ? (
                        <div style={{ marginTop: "auto", paddingTop: "1.2rem" }}>
                          <button
                            onClick={() => setSellerRatingTarget(tx)}
                            style={{
                              background: "#cc0000",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              padding: "0.8rem 1.2rem",
                              fontWeight: "700",
                              cursor: "pointer",
                              fontFamily: "Georgia, serif",
                              width: "100%",
                              marginTop: "auto",
                            }}
                          >
                            Rate Seller
                          </button>
                        </div>
                      ) : tx.sellerRating ? (
                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: "1.2rem",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              style={{
                                color:
                                  star <= tx.sellerRating ? "#f59e0b" : "#ccc",
                              }}
                            >
                              ★
                            </span>
                          ))}
                          <span
                            style={{
                              marginLeft: "0.5rem",
                              fontSize: "0.9rem",
                              color: "#555",
                            }}
                          >
                            {Number(tx.sellerRating).toFixed(1)}
                          </span>
                        </div>
                      ) : null)}

                    {isSeller &&
                      (canRateBuyer ? (
                        <div style={{ marginTop: "auto", paddingTop: "1.2rem" }}>
                          <button
                            onClick={() => setRatingTarget(tx)}
                            style={{
                              background: "#cc0000",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              padding: "0.8rem 1.2rem",
                              fontWeight: "700",
                              cursor: "pointer",
                              fontFamily: "Georgia, serif",
                              width: "100%",
                              marginTop: "auto",
                            }}
                          >
                            Rate Buyer
                          </button>
                        </div>
                      ) : tx.buyerRating ? (
                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: "1.2rem",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              style={{
                                color:
                                  star <= tx.buyerRating ? "#f59e0b" : "#ccc",
                              }}
                            >
                              ★
                            </span>
                          ))}
                          <span
                            style={{
                              marginLeft: "0.5rem",
                              fontSize: "0.9rem",
                              color: "#555",
                            }}
                          >
                            {Number(tx.buyerRating).toFixed(1)}
                          </span>
                        </div>
                      ) : null)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {ratingTarget && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "12px",
              width: "320px",
              textAlign: "center",
            }}
          >
            <h3>Rate Buyer</h3>

            <p style={{ fontWeight: "600" }}>
              Listing: {ratingTarget.listing?.title || "Unknown"}
            </p>

            {ratingTarget.listing?.imageUrl && (
              <img
                src={ratingTarget.listing.imageUrl}
                alt={ratingTarget.listing.title}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
            )}

            <p style={{ marginBottom: "1rem" }}>
              Buyer: {ratingTarget.buyer?.username || "Unknown"}
            </p>

            <p style={{ marginBottom: "1rem" }}>How was your transaction?</p>

            <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRatingValue(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= ratingValue ? "#f59e0b" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <button
              onClick={handleSubmitBuyerRating}
              style={{
                padding: "0.6rem 1.2rem",
                background: "#cc0000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Submit Rating
            </button>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => {
                  setRatingTarget(null);
                  setRatingValue(0);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {sellerRatingTarget && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "12px",
              width: "320px",
              textAlign: "center",
            }}
          >
            <h3>Rate Seller</h3>

            <p style={{ fontWeight: "600" }}>
              Listing: {sellerRatingTarget.listing?.title || "Unknown"}
            </p>

            {sellerRatingTarget.listing?.imageUrl && (
              <img
                src={sellerRatingTarget.listing.imageUrl}
                alt={sellerRatingTarget.listing.title}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
            )}

            <p style={{ marginBottom: "1rem" }}>
              Seller: {sellerRatingTarget.seller?.username || "Unknown"}
            </p>

            <p style={{ marginBottom: "1rem" }}>How was your transaction?</p>

            <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setSellerRatingValue(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= sellerRatingValue ? "#f59e0b" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <button
              onClick={handleSubmitSellerRating}
              style={{
                padding: "0.6rem 1.2rem",
                background: "#cc0000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Submit Rating
            </button>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => {
                  setSellerRatingTarget(null);
                  setSellerRatingValue(0);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;