import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import api from "../lib/axios";

function MessagesPage({ setPage, user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sendingByListing, setSendingByListing] = useState({});
  const [replyTextByListing, setReplyTextByListing] = useState({});

  const currentUserId = user?._id || null;

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
        listingId,
        listingTitle:
          message.listing && typeof message.listing === "object"
            ? message.listing.title
            : "Unknown Listing",
        messages: [],
      };
    }

    groups[listingId].messages.push(message);
  });

  Object.values(groups).forEach((group) => {
    group.messages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  });

  return Object.entries(groups);
}, [messages]);

  const getRecipientIdForConversation = (conversationMessages) => {
    if (!conversationMessages.length) return null;

    const sortedMessages = [...conversationMessages].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const latestMessage = sortedMessages[0];

    const senderId = 
      latestMessage.sender && typeof latestMessage.sender === "object"
        ? latestMessage.sender._id : latestMessage.sender;

    const receiverId =
      latestMessage.receiver && typeof latestMessage.receiver === "object"
        ? latestMessage.receiver._id : latestMessage.receiver;

    if (!currentUserId) {
      return receiverId || senderId || null;
    }

    if (String(senderId) === String(currentUserId)) {
      return receiverId || null;
    }

    return senderId || null;
  };

  const handleReplyChange = (listingId, value) => {
    setReplyTextByListing((prev) => ({
      ...prev,
      [listingId]: value,
    }));
  };

  const handleSendReply = async (listingId, conversationMessages) => {
    const token = localStorage.getItem("token");
    const replyText = (replyTextByListing[listingId] || "").trim();

    if (!replyText) {
      return;
    }

    const recipientId = getRecipientIdForConversation(conversationMessages);

    if (!recipientId) {
      alert("Could not determine who to send this message to.");
      return;
    }

    try {
      setSendingByListing((prev) => ({
        ...prev,
        [listingId]: true,
      }));

      const res =await api.post(
        "/messages/send",
        {
          recipientId,
          listingId,
          content: replyText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prev) => [...prev, res.data.messageData]);

      setReplyTextByListing((prev) => ({
        ...prev,
        [listingId]: "",
      }));
    } catch (err) {
      console.error("Error sending reply:", err);
      alert(err.response?.data?.message || "Failed to send reply.");
    } finally {
      setSendingByListing((prev) => ({
        ...prev,
        [listingId]: false,
      }));
    }
  };

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

                <div style={{ marginTop: "16px" }}>
                  <textarea
                    value={replyTextByListing[listingId] || ""}
                    onChange={(e) =>
                      handleReplyChange(listingId, e.target.value)
                    }
                    placeholder="Type your reply..."
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      resize: "vertical",
                      fontFamily: "Georgia, sans-serif",
                      boxSizing: "border-box",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => handleSendReply(listingId, group.messages)}
                    disabled={sendingByListing[listingId]}
                    style={{
                      marginTop: "10px",
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
                    {sendingByListing[listingId] ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;