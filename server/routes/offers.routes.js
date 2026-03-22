import express from "express";
import Offer from "../models/Offer.js";
import Listing from "../models/Listing.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

//save offer to database
router.post("/", protect, async (req, res) => {
    try {
        const listingId = String(req.body?.listingId || "").trim();
        const amount = Number(req.body?.amount);

        if (!req.user) {
            return res.status(401).json({ message: "User not authorized" });
        }

        if (!listingId) {
            return res.status(400).json({ message: "Listing ID is required" });
        }

        if (!Number.isFinite(amount) || amount < 0.01) {
            return res.status(400).json({ message: "Amount must be at least 0.01" });
        }

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (!listing.seller) {
            return res.status(400).json({ message: "Listing seller is required" });
        }

        const offer = new Offer({
            amount,
            buyer: req.user._id,
            listing: listing._id,
            seller: listing.seller,
        });

        const savedOffer = await offer.save();

        res.status(201).json(savedOffer);
    } catch (error) {
        if (error && error.name === "CastError") {
            return res.status(400).json({ message: "Invalid listing ID" });
        }

        if (error && error.name === "ValidationError") {
            return res.status(400).json({ message: "Offer validation failed", errors: error.errors });
        }

        console.error(error);
        res.status(500).json({ message: "Failed to save offer" });
    }
});

//seller view for offers on their listings
router.get("/listing/:listingId", protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const listing = await Listing.findById(req.params.listingId);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (!listing.seller || listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to view offers for this listing" });
        }

        const offers = await Offer.find({ listing: listing._id }).populate("buyer", "username").sort({ createdAt: -1 });

        res.json(offers);
    } catch (error) {
        if (error && error.name === "CastError") {
            return res.status(400).json({ message: "Invalid listing ID" });
        }

        console.error(error);
        res.status(500).json({ message: "Failed to fetch offers" });
    }
});

export default router;  