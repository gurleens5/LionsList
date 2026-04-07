import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import api from "../lib/axios";

function MessagesPage({ setPage }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view messages");
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessages(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      } 
    };

    fetchMessages();
  }, []);

  const groupedMessages = useMemo(() => {
    const groups = {};

    messages.forEach((message) => {
      const listingId =
        message.listing && typeof message.listing === "object"
          ? message.listing._id
          : message.listing;

      if (!listingId) return;

      if (!groups[listingId]) {
        groups[listingId] = {
          listingTitle:
            message.listing && typeof message.listing === "object"
              ? message.listing.title
              : "Unknown Listing",
          messages: [],
        };
      }

      groups[listingId].messages.push(message);
    });

    return Object.entries(groups);
  }, [messages]);

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
              marginBottom: "16px",
              fontSize: "2rem",
              color: "#111",
            }}
          >
            Messages
          </h1>

          {loading && <p style={{ color: "#666" }}>Loading messages...</p>}

          {!loading && error && (
            <p style={{ color: "#cc0000", margin: 0 }}>{error}</p>
          )}

          {!loading && !error && groupedMessages.length === 0 && (
            <p style={{ color: "#666", margin: 0 }}>
              Your conversations will appear here.
            </p>
          )}

          {!loading &&
            !error &&
            groupedMessages.map(([listingId, group]) => (
              <div
                key={listingId}
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#fafafa",
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
                  {group.listingTitle}
                </h2>

                <div>
                  {group.messages.map((message, index) => (
                    <div
                      key={message._id}
                      style={{
                        padding: "12px 0",
                        borderTop:  index === 0 ? "none" : "1px solid #e5e5e5",
                      }}
                    >
                      <p 
                        style={{ 
                          margin: "0 0 6px 0",
                          fontSize: "0.95rem",
                          color: "#222",
                        }}
                      >
                        <strong>Sender:</strong>{" "}
                        {message.sender?.username || "Unknown"}
                      </p>
                      <p
                        style={{
                          margin: "0 0 6px 0",
                          fontSize: "0.9rem",
                          color: "#888"
                        }}
                      >
                        <strong>Sent:</strong>{" "}
                        {message.createdAt ? new Date(message.createdAt).toLocaleString() : "Unknown time"}
                      </p>
                      
                      <p style={{ margin: 0, color: "#333" }}>
                        {message.msgContent}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;