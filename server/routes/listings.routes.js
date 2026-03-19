import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();

const normalizeCategory = (category) => {
  const value = String(category || "").trim().toLowerCase();

  if (value === "textbook" || value === "textbooks") return "Textbooks";
  if (value === "note" || value === "notes") return "Notes";
  if (value === "lab kit" || value === "labkit") return "Lab Kit";
  if (value === "stationery") return "Stationery";
  if (value === "study guide" || value === "studyguide") return "Study Guide";

  return String(category || "").trim();
};

// get all listings or filtered listings
router.get("/", async (req, res) => {
  try {
    const { categories, courseTitle } = req.query;
    const query = {};

    if (categories) {
      const categoryList = categories
        .split(",")
        .map((item) => normalizeCategory(item))
        .filter(Boolean);

      if (categoryList.length > 0) {
        query.category = { $in: categoryList };
      }
    }

    if (courseTitle && courseTitle.trim() !== "") {
      query.title = { $regex: courseTitle.trim(), $options: "i" };
    }

    const listings = await Listing.find(query).sort({ createdAt: -1 }).limit(50);
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});

// create listing API endpoint
router.post("/", async (req, res) => {
  try {
    const title = String(req.body?.title || "").trim();
    const description = String(req.body?.description || "").trim();
    const category = normalizeCategory(req.body?.category);
    const courseCode = String(req.body?.courseCode || "").trim();
    const imageUrl = String(req.body?.imageUrl || "").trim();
    const price = Number(req.body?.price);
    const seller = req.body?.seller || null;

    if (!title || !description || !category || !price) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    const listing = await Listing.create({
      title,
      description,
      category,
      courseCode,
      imageUrl,
      price,
      seller,
    });

    res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create listing" });
  }
});

// fetch listing by id
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("seller", "username");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({
      ...listing.toObject(),
      sellerUsername: listing.seller?.username || "Unknown",
    });
  } catch (error) {
    if (error && error.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    res.status(500).json({ message: "Failed to fetch listing" });
  }
});

export default router;