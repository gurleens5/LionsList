import React, { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

function Header({ setPage }) {
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("signin");
  };

  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, height: "70px", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", zIndex: 100 }}>

      {/* Logo */}
      <div onClick={() => setPage("home")} style={{ fontSize: "1.5rem", fontWeight: 600, cursor: "pointer", fontFamily: "Georgia, sans-serif" }}>
        <span style={{ color: "#cc0000" }}>Lions</span>
        <span style={{ color: "#fff", marginLeft: "1px" }}>List</span>
      </div>

      {/* Desktop nav */}
      <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "18px", fontFamily: "Georgia, sans-serif" }}>
        <div onClick={() => setPage("listings")} style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Browse</div>
        <div onClick={() => token ? setPage("create-listing") : setPage("signin")} style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Sell</div>
        <div onClick={() => token ? setPage("sent-offers") : setPage("signin")} style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Sent Offers</div>
        <div onClick={() => token ? setPage("my-listings") : setPage("signin")} style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>My Listings</div>
        <div onClick={() => token ? setPage("history") : setPage("signin")} style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>History</div>
        <div onClick={() => token ? setPage("messages") : setPage("signin")} style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Messages</div>

        <FaUserCircle
          onClick={() => token ? setPage("profile") : setPage("signin")}
          style={{ color: "#fff", fontSize: "24px", cursor: "pointer" }}
        />

        {!token ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", background: "#cc0000", borderRadius: "20px", padding: "0.4rem 1.2rem" }}>
            <span onClick={() => setPage("signin")} style={{ color: "#111", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer" }}>Sign In</span>
            <span style={{ color: "#111" }}>|</span>
            <span onClick={() => setPage("signup")} style={{ color: "#111", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer" }}>Sign Up</span>
          </div>
        ) : (
          <div onClick={handleLogout} style={{ background: "#cc0000", borderRadius: "20px", padding: "0.4rem 1.2rem", cursor: "pointer", fontWeight: "600", color: "#fff" }}>
            Logout
          </div>
        )}
      </div>

      {/* Hamburger */}
      <div className="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }}>
        {menuOpen ? <FaTimes style={{ color: "#fff", fontSize: "22px" }} /> : <FaBars style={{ color: "#fff", fontSize: "22px" }} />}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: "70px", left: 0, right: 0, bottom: 0, background: "#000", display: "flex", flexDirection: "column", gap: "2rem", padding: "2.5rem 1.5rem", fontFamily: "Georgia, sans-serif", zIndex: 99 }}>
          <div onClick={() => go("listings")} style={{ color: "#fff", fontWeight: 500, fontSize: "1.3rem", cursor: "pointer" }}>Browse</div>
          <div onClick={() => token ? go("create-listing") : go("signin")} style={{ color: "#fff", fontWeight: 500, fontSize: "1.3rem", cursor: "pointer" }}>Sell</div>
          <div onClick={() => token ? go("sent-offers") : go("signin")} style={{ color: "#fff", fontWeight: 500, fontSize: "1.3rem", cursor: "pointer" }}>Sent Offers</div>
          <div onClick={() => token ? go("my-listings") : go("signin")} style={{ color: "#fff", fontWeight: 500, fontSize: "1.3rem", cursor: "pointer" }}>My Listings</div>
          <div onClick={() => token ? go("history") : go("signin")} style={{ color: "#fff", fontWeight: 500, fontSize: "1.3rem", cursor: "pointer" }}>History</div>
          <div onClick={() => token ? go("messages") : go("signin")} style={{ color: "#fff", fontWeight: 500, fontSize: "1.3rem", cursor: "pointer" }}>Messages</div>
          <FaUserCircle onClick={() => token ? go("profile") : go("signin")} style={{ color: "#fff", fontSize: "1.8rem", cursor: "pointer" }} />

          {!token ? (
            <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
              <span onClick={() => go("signin")} style={{ color: "#cc0000", fontWeight: "600", fontSize: "1.3rem", cursor: "pointer" }}>Sign In</span>
              <span style={{ color: "#fff" }}>|</span>
              <span onClick={() => go("signup")} style={{ color: "#cc0000", fontWeight: "600", fontSize: "1.3rem", cursor: "pointer" }}>Sign Up</span>
            </div>
          ) : (
            <div onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ color: "#cc0000", fontWeight: "600", fontSize: "1.3rem", cursor: "pointer" }}>
              Logout
            </div>
          )}
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav { display: none; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: block; }
        }
      `}</style>

    </header>
  );
}

export default Header;