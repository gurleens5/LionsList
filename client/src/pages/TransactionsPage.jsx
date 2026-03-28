import { useState, useEffect } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

const TransactionsPage = ({ setPage }) => {
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
          Transactions
        </h1>

        {error && <p style={{ color: "#cc0000" }}>{error}</p>}
        {loading && <p>Loading transactions...</p>}

        {!loading && transactions.length === 0 && (
          <p style={{ color: "#444" }}>No transactions yet.</p>
        )}

        {!loading && transactions.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
                {transactions.map((tx) => (
                    <div
                        key={tx._id}
                        style={{
                        width: "320px",
                        minHeight: "250px",
                        background: "#fff",
                        borderRadius: "14px",
                        border: "1px solid #ddd",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#111", fontSize: "1.4rem" }}>
                    {tx.listing?.title || "Listing"}
                    </h3>

                    <p style={{ margin: "0.3rem 0" }}>
                    <strong>Price:</strong> ${tx.listing?.price}
                    </p>

                    <p style={{ margin: "0.3rem 0" }}>
                    <strong>Buyer:</strong> {tx.buyer?.username}
                    </p>

                    <p style={{ margin: "0.3rem 0" }}>
                    <strong>Seller:</strong> {tx.seller?.username}
                    </p>

                    <p style={{ margin: "0.3rem 0" }}>
                    <strong>Date:</strong> {new Date(tx.createdAt).toLocaleString()}
                    </p>

                    <p style={{ marginTop: "auto", fontWeight: "700", color: "#155724" }}>
                    Completed
                    </p>
                </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;