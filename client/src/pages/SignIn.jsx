
import Header from "../components/Header";
import React, { useState } from "react";

function SignIn({ setPage }) {
    const [password, setPassword] = useState("");

    return (
        <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>

            {/* Header */}
            <Header setPage={setPage} />

            {/* Back button */}
            <div style={{ padding: "5rem 1.5rem 0 1.5rem" }}>
                <span onClick={() => setPage("home")} style={{ cursor: "pointer" }}>← Back to Home</span>
            </div>

            {/* Sign In Box */}
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                <div style={{ background: "#fff", borderRadius: "12px", padding: "3rem 2.5rem", width: "100%", maxWidth: "420px" }}>

                    <h2 style={{ margin: "0 0 0.3rem 0" }}>Sign In</h2>
                    <p style={{ color: "#888", margin: "0 0 2rem 0" }}>Use your YorkU email to continue</p>

                    <label>YorkU Email</label>
                    <input type="email"
                        placeholder="yourname@yorku.ca"
                        style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.4rem 0 1.2rem 0", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box", fontSize: "1rem", fontFamily: "Georgia, serif" }}/>
                    
                    <label>Password</label>
                    <input 
                        type="password"
                        value= {password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.4rem 0 1.2rem 0", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box", fontSize: "1rem", fontFamily: "Georgia, serif" }}/>
                    
                    <button style={{ width: "100%", background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px", padding: "0.9rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                        Sign In
                    </button>

                    <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#666" }}>
                        Don't have an account?{" "}
                        <span onClick={() => setPage("signup")} style={{ color: "#cc0000", fontWeight: "600", cursor: "pointer" }}>Sign Up</span>
                    </p>

                </div>
            </div>

        </div>
    );
}

export default SignIn;