import { useState, useEffect } from "react";
import api from "../lib/axios";
import Header from "../components/Header";

// US-07-1: display all listings
const ListingsPage = ({ setPage, setSelectedListingId, setPreviousPage, homeSearch = "", setHomeSearch, selectedCategories, 
  setSelectedCategories, courseTitleInput, setCourseTitleInput, searchQuery, setSearchQuery, searchInput, 
  setSearchInput, }) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const categoryOptions = ["Textbooks", "Notes", "Lab Kit", "Stationery", "Study Guide"];

  useEffect(() => {
  if (homeSearch) {
    setSearchInput(homeSearch);
    setSearchQuery(homeSearch);
    setHomeSearch("");
  }
}, [homeSearch]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const params = { status: "Available" };

        if (selectedCategories.length > 0) {
          params.categories = selectedCategories.join(",");
        }

        if (courseTitleInput.trim() !== "") {
          params.courseTitle = courseTitleInput.trim();
        }

        if (searchQuery.trim() !== "") {
          params.keyword = searchQuery.trim();
        }

        const res = await api.get("/listings", { params });
        setListings(res.data);
        setError("");
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [selectedCategories, courseTitleInput, searchQuery]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setCourseTitleInput("");
  };

  const noListingsMatch = !loading && !error && listings.length === 0;

  return (
    <div style={{ minHeight: "100vh", background: "#e6e4e4", fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ height: "70px" }} />

      <div style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "1.5rem", fontSize: "2.2rem", fontWeight: "800", color: "#111" }}>
          Browse Listings
        </h1>

        {error && <p style={{ color: "#cc0000" }}>{error}</p>}

        <div style={{ display: "flex", width: "100%", maxWidth: "600px", marginBottom: "1.5rem" }}>
          <input
            placeholder="Search for textbooks, notes, lab kits..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            style={{
              flex: 1, padding: "0.9rem 1.5rem", fontSize: "1rem",
              border: "none", borderRadius: "8px 0 0 8px",
              background: "#ffffff", color: "#111", outline: "none",
              fontFamily: "serif",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              background: "#cc0000", color: "#fff", border: "none",
              borderRadius: "0 8px 8px 0", padding: "0.9rem 1.8rem",
              fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif",
            }}
          >
            Search
          </button>
        </div>

        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <div style={{ width: "250px", background: "#fff", borderRadius: "14px", border: "1px solid #ddd",
                        padding: "1.25rem", flexShrink: 0 }}>
            <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.4rem", color: "#111" }}>
              Filters
            </h2>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginTop: 0, marginBottom: "0.75rem", fontSize: "1.1rem", color: "#111" }}>
                Category
              </h3>

              {categoryOptions.map((category) => (
                <label key={category} style={{ display: "flex", alignItems: "center", gap: "0.5rem",
                                               marginBottom: "0.6rem", color: "#222", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginTop: 0, marginBottom: "0.75rem", fontSize: "1.1rem", color: "#111" }}>
                Course Title
              </h3>

              <input
                type="text"
                placeholder="Enter course title"
                value={courseTitleInput}
                onChange={(e) => setCourseTitleInput(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc",
                         fontFamily: "Georgia, sans-serif", fontSize: "1rem", boxSizing: "border-box" }}
              />
            </div>

            <button
              onClick={handleResetFilters}
              style={{ background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px",
                       padding: "0.75rem 1rem", fontWeight: "700", cursor: "pointer",
                       fontFamily: "Georgia, serif", width: "100%" }}
            >
              Clear Filters
            </button>
          </div>

          <div style={{ flex: 1 }}>
            {loading && <p>Loading listings...</p>}

            {noListingsMatch && (
              <p style={{ color: "#cc0000", fontSize: "1.1rem", fontWeight: "700" }}>
                No listings found.
              </p>
            )}

            {!noListingsMatch && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
                {!loading && listings.map((listing) => (
                  <div key={listing._id} style={{ width: "320px", minHeight: "470px", background: "#fff", borderRadius: "14px",
                    overflow: "hidden", border: "1px solid #ddd", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "180px", background: "#d9d9d9", display: "flex", alignItems: "center",
                                  justifyContent: "center", color: "#666", fontWeight: "600" }}>
                      {listing.imageUrl ? (
                        <img src={listing.imageUrl} alt={listing.title}
                             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        "No Image"
                      )}
                    </div>

                    <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#111", fontSize: "1.4rem", minHeight: "68px" }}>
                        {listing.title}
                      </h3>

                      <p style={{ color: "#444", marginBottom: "0.75rem", lineHeight: "1.6", minHeight: "110px" }}>
                        {listing.description}
                      </p>

                      <p style={{ margin: "0.3rem 0" }}>
                        <strong>Category:</strong> {listing.category}
                      </p>

                      <p style={{ margin: "0.3rem 0 1rem 0" }}>
                        <strong>Course Code:</strong> {listing.courseCode}
                      </p>

                      <p style={{ margin: "0.3rem 0" }}>
                        <strong>Price:</strong> ${listing.price}
                      </p>

                      <p style={{ margin: "0.3rem 0 1rem 0" }}>
                        <strong>Status:</strong>{" "}
                        <span
                          style={{
                            backgroundColor: listing.status === "Available" ? "#d4edda" : "#eee",
                            color: listing.status === "Available" ? "#155724" : "#555",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "6px",
                            fontWeight: "700",
                            fontSize: "0.85rem"
                          }}
                        >
                          {listing.status}
                        </span>
                      </p>

                      <button onClick={() => { 
                        setPreviousPage("listings");
                        setSelectedListingId(listing._id); 
                        setPage("listing-details"); 
                      }}
                              style={{ background: "#cc0000", color: "#fff", border: "none", borderRadius: "8px",
                                       padding: "0.8rem 1.2rem", fontWeight: "700", cursor: "pointer",
                                       fontFamily: "Georgia, serif", width: "100%", marginTop: "auto" }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;