
import Header from "../components/Header";
import React, { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router";

function SignIn({ setPage, setUser }) {
    const[formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/login", formData);
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            setUser(res.data);
            setPage("listings");
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed")
        }
    }

    return (
        <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>

            {/* Header */}
            <Header setPage={setPage} />

            {/* Sign In Box */}
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem", paddingTop: "150px" }}>
                <div style={{ background: "#fff", borderRadius: "12px", padding: "3rem 2.5rem", width: "100%", maxWidth: "420px" }}>

                    <h2 style={{ margin: "0 0 0.3rem 0" }}>Sign In</h2>
                    <p style={{ color: "#888", margin: "0 0 2rem 0" }}>Use your YorkU email to continue</p>

                    <form onSubmit={handleSubmit}>

                    <label>YorkU Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@yorku.ca"
                        style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.4rem 0 1.2rem 0", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box", fontSize: "1rem", fontFamily: "Georgia, serif" }}/>
                    
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value= {formData.password}
                        onChange={handleChange}
                        style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.4rem 0 1.2rem 0", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box", fontSize: "1rem", fontFamily: "Georgia, serif" }}/>
                    
                    {error && (
                        <p style={{ color: "#cc0000", marginBottom: "1rem" }}>
                            {error}
                        </p>
                    )}

                    <button style={{ width: "100%", background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px", padding: "0.9rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                        Sign In
                    </button>

                    </form>

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