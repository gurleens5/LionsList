import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import api from "../lib/axios";

function EditListingPage({ setPage, listingId }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    courseCode: "",
    imageUrl: "",
    price: "",
  });

  const [error, setError] = useState("");

  const updateListingField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const submitEditForm = async (e) => {
  e.preventDefault();

  const { title, description, category, price } = formData;

  if (!title.trim() || !description.trim() || !category.trim() || !price) {
    setError("Please fill all required fields.");
    return;
  }

  if (Number(price) <= 0) {
    setError("Price must be a positive number.");
    return;
  }

  try {
    setError("");

    const token = localStorage.getItem("token");

    await api.put(
      `/listings/${listingId}`,
      {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        courseCode: formData.courseCode.trim(),
        imageUrl: formData.imageUrl.trim(),
        price: Number(formData.price),
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Refetches the current lilsting which refreshes the listing
    setPage("listing-details", listingId);

  } catch (err) {
    setError(err.response?.data?.message || "Failed to update listing.");
  }
};

  // Fetch existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${listingId}`);
        const listing = res.data;

        setFormData({
          title: listing.title || "",
          description: listing.description || "",
          category: listing.category || "",
          courseCode: listing.courseCode || "",
          imageUrl: listing.imageUrl || "",
          price: listing.price || "",
        });

      } catch (err) {
        console.error("Error fetching listing:", err);
        setError("Failed to load listing.");
      }
    };

    if (listingId) {
      fetchListing();
    }

  }, [listingId]);

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
          <h2 style={{ margin: "0 0 0.3rem 0" }}>Edit Listing</h2>
          <p style={{ color: "#888", margin: "0 0 2rem 0" }}>
            Click "Save Changes" when done
          </p>

          <form onSubmit={submitEditForm}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              }}
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
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
                minHeight: "110px",
                resize: "vertical",
              }}
            />

            <label>Category</label>
            <input
              type="text"
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
              }}
            />

            <label>Course Code</label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
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
              }}
            />

            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
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
              }}
            />

            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
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
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditListingPage;