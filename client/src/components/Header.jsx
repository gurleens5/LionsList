import React from "react";
import { FaUserCircle } from "react-icons/fa";

function Header({ setPage }) {

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("signin");   // redirect to login page
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        zIndex: 100,
      }}
    >
      {/* LionsList - Left Side */}
      <div
        onClick={() => setPage("home")}
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "Georgia, sans-serif",
        }}
      >
        <span style={{ color: "#cc0000" }}>Lions</span>
        <span style={{ color: "#fff", marginLeft: "1px" }}>List</span>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px", fontFamily: "Georgia, sans-serif" }}>
        <div
          onClick={() => setPage("listings")}
          style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
        >
          Browse
        </div>

        <div
          onClick={() => setPage("create-listing")}
          style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
        >
          Sell
        </div>

        <div
          onClick={() => setPage("sent-offers")}
          style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
        >
          Sent Offers
        </div>

        <div
          onClick={() => setPage("my-listings")}
          style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
        >
          My Listings
        </div>

        <FaUserCircle style={{ color: "#fff", fontSize: "24px", cursor: "pointer" }} />

        {!token ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              background: "#cc0000",
              borderRadius: "20px",
              padding: "0.4rem 1.2rem",
            }}
          >
            <span
              onClick={() => setPage("signin")}
              style={{ color: "#111", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer" }}
            >
              Sign In
            </span>

            <span style={{ color: "#111" }}>|</span>

            <span
              onClick={() => setPage("signup")}
              style={{ color: "#111", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer" }}
            >
              Sign Up
            </span>
          </div>
        ) : (
          <div
            onClick={handleLogout}
            style={{
              background: "#cc0000",
              borderRadius: "20px",
              padding: "0.4rem 1.2rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;