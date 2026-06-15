import React, { useState } from "react";
import Header from "../components/Header";

function Home({ setPage, setHomeSearch, setSelectedCategories, setCourseCodeInput }) {

  const [input, setInput] = useState("");

  
  const handleSearch = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput)
      return;

    setHomeSearch(trimmedInput);
    setSelectedCategories([]);
    setCourseCodeInput("");
    setPage("listings");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter")
      handleSearch();
  };

  const handleCategoryClick = (categoryName) => {
    setHomeSearch("");
    setSelectedCategories([categoryName]);
    setCourseCodeInput("");
    setPage("listings", "homepage-category");
  };

  const categories = [
    {
      name: "Textbook",
      description: "Find textbooks for your courses and semester needs.",
      background: "#eef5ff",
      border: "#cfe0ff",
    },
    {
      name: "Notes",
      description: "Browse study notes, summaries, and review materials.",
      background: "#f7f0ff",
      border: "#e0ccff",
    },
    {
      name: "Lab Kit",
      description: "Find lab kits and materials needed for your course labs.",
      background: "#eefaf0",
      border: "#cfe8d3",
    },
    {
      name: "Stationery",
      description: "Browse notebooks, binders, pens, and school supplies.",
      background: "#fff7eb",
      border: "#ffd9a8",
    },
    {
      name: "Study Guide",
      description: "Find study guides and exam preparation resources.",
      background: "#fff0f0",
      border: "#ffd0d0",
    },
  ];

  return (
    <div style={{ fontFamily: "Georgia, sans-serif" }}>
      <Header setPage={setPage} />

      <div style={{ height: "50px" }} />

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

      <div style={{
        background: "#e6e4e4", padding: "4rem 2rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
      }}>
        <h2 style={{
          color: "#000000", fontSize: "2rem", fontWeight: "800",
          fontFamily: "Georgia, sans-serif", margin: 0, textAlign: "center"
        }}>
          Explore the Marketplace
        </h2>
        <div style={{ display: "flex", width: "100%", maxWidth: "600px" }}>
          <input
            placeholder="Search for textbooks..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, padding: "0.9rem 1.0rem", fontSize: "1rem",
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

        <div style={{ width: "100%", maxWidth: "1150px", marginTop: "2rem" }}>
          <h2 style={{
            color: "#000000",
            fontSize: "2rem",
            fontWeight: "800",
            fontFamily: "Georgia, sans-serif",
            margin: "0 0 0.6rem 0",
            textAlign: "center",
          }}>
            Browse by Category
          </h2>

          <p style={{
            margin: "0 0 1.75rem 0",
            color: "#555",
            textAlign: "center",
            fontSize: "1rem",
          }}>
            Explore listings by category
          </p>

          <div style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                style={{
                  minWidth: "160px",
width: "200px",
height: "150px",
overflow: "hidden",
background: category.background,
border: `1px solid ${category.border}`,
borderRadius: "14px",
padding: "1.2rem",
flexShrink: 0,
textAlign: "left",
cursor: "pointer",
fontFamily: "Georgia, serif",
                }}
              >
                <h3 style={{
                  margin: "0 0 0.6rem 0",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#222",
                }}>
                  {category.name}
                </h3>

                <p style={{
                  margin: 0,
                  color: "#555",
                  lineHeight: "1.5",
                  fontSize: "0.95rem",
                }}>
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;