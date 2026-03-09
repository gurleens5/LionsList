import { useNavigate } from "react-router";
import Header from "../components/Header";
import React, { useState } from "react";
import api from "../lib/axios";

function SignUp({ setPage, setUser }) {
    const[formData, setFormData] = useState({
        username: "",
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
            const res = await api.post("/register", formData);
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            setUser(res.data);
            navigate("/");
        } catch (err) {
            //console.log(err);
            setError(err.response?.data?.message || "Registration Failed")
        }
    }

    return (
        <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>

            {/* Header */}
            <Header setPage={setPage} />

            {/* Back button */}
            <div style={{ padding: "5rem 1.5rem 0 1.5rem" }}>
                <span onClick={() => setPage("home")} style={{ cursor: "pointer" }}>← Back to Home</span>
            </div>

            {/* Sign Up Box */}
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                <div style={{ background: "#fff", borderRadius: "12px", padding: "3rem 2.5rem", width: "100%", maxWidth: "420px" }}>

                    <h2 style={{ margin: "0 0 0.3rem 0" }}>Sign Up</h2>
                    <p style={{ color: "#888", margin: "0 0 2rem 0" }}>Welcome to LionsList!</p>

                    <form onSubmit={handleSubmit}>

                    <label>Full Name</label>
                    <input 
                        type="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.4rem 0 1.2rem 0", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box", fontSize: "1rem", fontFamily: "Georgia, serif" }}/>
                    
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
            

                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.4rem 0 1.2rem 0", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box", fontSize: "1rem", fontFamily: "Georgia, serif" }}/>
                    
                    
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p style={{ color: "#cc0000", fontSize: "0.85rem", margin: "0 0 1rem 0" }}>
                        Passwords do not match.
                    </p>
                    )}
                    <div style={{ marginBottom: "1.5rem" }} />

                        {/* If passwords match */}
                        {(!formData.confirmPassword || formData.password === formData.confirmPassword) && (
                            <div style={{ marginBottom: "1.5rem" }} />
                        )}

                    {error && (
                        <p style={{ color: "#cc0000", marginBottom: "1rem" }}>
                            {error}
                        </p>
                    )}

                    <button style={{ width: "100%", background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px", padding: "0.9rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                        Sign Up
                    </button>

                    </form>
                    
                </div>
            </div>

        </div>
    );
}

export default SignUp;