import Header from "../components/Header";
import React, { useState } from "react";
import api from "../lib/axios";

function CreateListingPage({ setPage }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    courseCode: "",
    imageUrl: "",
    price: "",
    status: "Available",
  });

  const [error, setError] = useState("");

  const categoryOptions = ["Textbooks", "Notes", "Lab Kit", "Stationery", "Study Guide"];

  const updateListingField = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setError("");
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const submitListingForm = async (e) => {
    e.preventDefault();

    const { title, description, category, price } = formData;

    if (!title.trim() || !description.trim() || !category.trim() || !price) {
      setError("Please fill all required fields.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price.trim())) {
      setError("Price can have at most 2 decimal places.");
      return;
    }

    if (Number(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

      const userRes = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userId = userRes.data?._id;

      await api.post("/listings", {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        courseCode: formData.courseCode.trim(),
        imageUrl: formData.imageUrl.trim(),
        price: Number(formData.price),
        status: "Available",
        seller: userId
      });

      setPage("listings");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to create listing.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ display: "flex", justifyContent: "center", padding: "7rem", paddingTop: "150px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "3rem 2.5rem",
            width: "100%",
            maxWidth: "520px",
          }}
        >
          <h2 style={{ margin: "0 0 0.3rem 0" }}>Create Listing</h2>
          <p style={{ color: "#888", margin: "0 0 2rem 0" }}>
            Add your item details to post it on the marketplace
          </p>

          <form onSubmit={submitListingForm}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={updateListingField}
              placeholder="Enter item title"
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0 1.2rem 0",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
              }}
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={updateListingField}
              placeholder="Enter item description"
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0 1.2rem 0",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
                minHeight: "110px",
                resize: "vertical",
              }}
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={updateListingField}
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0 1.2rem 0",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
                background: "#fff",
              }}
            >
              <option value="">Select category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label>Course Code</label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={updateListingField}
              placeholder="Enter course code"
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0 1.2rem 0",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
              }}
            />

            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={updateListingField}
              placeholder="Enter image URL"
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0 1.2rem 0",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
              }}
            />

            <label>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={updateListingField}
              placeholder="Enter price"
              inputMode="decimal"
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0 1.2rem 0",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
              }}
            />

            <label>Status</label>
            <input
              type="text"
              value="Available"
              readOnly
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.4rem 0 1.2rem 0",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
                background: "#f7f7f7",
                color: "#555",
              }}
            />

            {error && (
              <p style={{ color: "#cc0000", marginBottom: "1rem" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#cc0000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.9rem",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
              }}
            >
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateListingPage;