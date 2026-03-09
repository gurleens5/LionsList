import React from "react";
import Header from "../components/Header";

function Home({ setPage }) {
  return (
    <div style={{ fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      {/* Space under fixed header */}
      <div style={{ height: "50px" }} />

      {/* Hero Section */}
      <section style={{
        minHeight: "80vh",
        overflow: "hidden",
        backgroundImage: "url('/york-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.79)" }} />
        <div style={{ position: "relative", padding: "2rem 2rem", maxWidth: "850px" }}>
          <h1 style={{
            color: "#fff", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: "800",
            fontFamily: "Georgia, serif", lineHeight: "1.2", margin: "0 0 0.5rem 0",
          }}>
            A marketplace designed
          </h1>
          <h1 style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: "800",
            fontFamily: "Georgia, serif", lineHeight: "1.2", margin: "0 0 1.5rem 0",
          }}>
            <span style={{ color: "#cc0000" }}>exclusively </span>
            <span style={{ color: "#fff" }}>for YorkU students.</span>
          </h1>
          <p style={{
            color: "#fffdfd", fontSize: "1.20rem", lineHeight: "1.8",
            margin: "0 0 2rem 0", maxWidth: "700px",
          }}>
            Buy and sell textbooks, notes, lab kits, stationery, and study guides through
            a verified YorkU community.
          </p>
        </div>
      </section>

      {/* Explore Section */}
      <div style={{
        background: "#e6e4e4", padding: "4rem 2rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
      }}>
        <h2 style={{
          color: "#000000", fontSize: "2rem", fontWeight: "800",
          fontFamily: "Georgia, sans-serif", margin: 0,
        }}>
          Explore the Marketplace
        </h2>
        <div style={{ display: "flex", width: "100%", maxWidth: "600px" }}>
          <input
            placeholder="Search for textbooks, notes, lab kits..."
            style={{
              flex: 1, padding: "0.9rem 1.5rem", fontSize: "1rem",
              border: "none", borderRadius: "8px 0 0 8px",
              background: "#ffffff", color: "#111", outline: "none",
              fontFamily: "serif",
            }}
          />
          <button style={{
            background: "#cc0000", color: "#fff", border: "none",
            borderRadius: "0 8px 8px 0", padding: "0.9rem 1.8rem",
            fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif",
          }}>Search</button>
        </div>
      </div>

    </div>
  );
}

export default Home;