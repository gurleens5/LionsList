import Header from "../components/Header";
import React, { useState } from "react";
import api from "../lib/axios";

function Verify({ setPage, setUser, userId }) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/verify", { userId, code });
            localStorage.setItem("token", res.data.token);
            setUser(res.data);
            setPage("listings");
        } catch (err) {
            setError(err.response?.data?.message || "Verification Failed");
        }
    }

    return (
        <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
            <Header setPage={setPage} />
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem", paddingTop: "150px" }}>
                <div style={{ background: "#fff", borderRadius: "12px", padding: "3rem 2.5rem", width: "100%", maxWidth: "420px" }}>
                    <h2 style={{ margin: "0 0 0.3rem 0" }}>Verify Your Email</h2>
                    <p style={{ color: "#888", margin: "0 0 2rem 0" }}>Enter the 6-digit code sent to your YorkU email.</p>
                    <form onSubmit={handleSubmit}>
                        <label>Verification Code</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => { setCode(e.target.value); setError(""); }}
                            placeholder="123456"
                            maxLength={6}
                            style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.4rem 0 1.2rem 0", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box", fontSize: "1rem", fontFamily: "Georgia, serif" }}/>
                        {error && <p style={{ color: "#cc0000", marginBottom: "1rem" }}>{error}</p>}
                        <button style={{ width: "100%", background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px", padding: "0.9rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Verify;