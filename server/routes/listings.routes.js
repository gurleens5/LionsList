import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();

//get all listings
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find().sort({ createdAt: -1 }).limit(50);
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch listings" });
    }
});

//US-07-2: fetch listing by id
//US-07-4: display seller username
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
        res.status(400).json({ message: "Invalid listing ID" });
    }
});

export default router;