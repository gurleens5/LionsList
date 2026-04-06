import { useState, useEffect } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const TransactionsPage = ({ setPage, user }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get("/transactions/my", {
          headers: { Authorization: `Bearer ${token}` }
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

  return (
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "1.5rem", fontSize: "2.2rem", fontWeight: "800", color: "#111" }}>
          History
        </h1>

        {error && <p style={{ color: "#cc0000" }}>{error}</p>}
        {loading && <p>Loading transactions...</p>}

        {!loading && !error && transactions.length === 0 && (
          <p style={{ color: "#cc0000", fontWeight: "700", fontSize: "1.1rem" }}>
            You have no completed transactions yet.
          </p>
        )}

        {!loading && transactions.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
            {transactions.map((tx) => {
              const isBuyer = user && tx.buyer?._id === user._id;
              const isSeller = user && tx.seller?._id === user._id;

              const canRateBuyer = isSeller && tx.offer?.status === "Accepted";
              const canRateSeller = isBuyer && tx.offer?.status === "Accepted";

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
                    flexDirection: "column"
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
                      position: "relative"
                    }}
                  >
                    {tx.listing?.imageUrl ? (
                      <img
                        src={tx.listing.imageUrl}
                        alt={tx.listing.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                        fontSize: "0.85rem"
                      }}
                    >
                      {label} {formattedDate}
                    </span>
                  </div>

                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3
                      style={{
                        marginTop: 0,
                        marginBottom: "0.75rem",
                        color: "#111",
                        fontSize: "1.4rem",
                        minHeight: "68px"
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

                    {canRateSeller && (
                      <div style={{ marginTop: "auto", paddingTop: "1.2rem" }}>
                        <button
                          style={{
                            width: "100%",
                            padding: "0.8rem 1rem",
                            background: "#7f1d1d",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "1rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontFamily: "Georgia, sans-serif"
                          }}
                        >
                          Rate Seller
                        </button>
                      </div>
                    )}

                    {canRateBuyer && (
                      <div style={{ marginTop: "auto", paddingTop: "1.2rem" }}>
                        <button
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
                            marginTop: "auto"
                          }}
                        >
                          Rate Buyer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;