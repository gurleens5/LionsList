import React from "react";
import Header from "../components/Header";

function MessagesPage({ setPage }) {
  return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
        <Header setPage={setPage} />

        <div 
          style={{ 
            maxWidth: "1000px", 
            margin: "0 auto", 
            padding: "110px 20px 40px", 
            fontFamily: "Georgia, sans-serif" 
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

          <p style={{ color: "#666", margin: 0 }}>
            Your conversations will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;