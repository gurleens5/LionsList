import express from "express";
import Offer from "../models/Offer.js";
import Listing from "../models/Listing.js";
import Transaction from "../models/Transaction.js";
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

        const isSeller =
            listing.seller && listing.seller.toString() === req.user._id.toString();

        let offers;

        if (isSeller) {
            // seller sees all offers
            offers = await Offer.find({ listing: listing._id })
                .populate("buyer", "username")
                .sort({ createdAt: -1 });
        } else {
            // buyer only sees their own offers for listing
            offers = await Offer.find({
                listing: listing._id,
                buyer: req.user._id
            })
                .populate("buyer", "username")
                .sort({ createdAt: -1 });
        }

        res.json(offers);
    } catch (error) {
        if (error && error.name === "CastError") {
            return res.status(400).json({ message: "Invalid listing ID" });
        }

        console.error(error);
        res.status(500).json({ message: "Failed to fetch offers" });
    }
});

//buyer views own sent offers
router.get("/sent", protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const offers = await Offer.find({ buyer: req.user._id })
            .populate("listing")
            .sort({ createdAt: -1 });

        res.json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch sent offers" });
    }
});

// get some offer 
router.get("/:offerId", protect, async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.offerId).populate("listing");
        if (!offer) return res.status(404).json({ message: "Offer not found" });
        if (offer.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        res.json(offer);
    } catch (error) {
        if (error.name === "CastError") return res.status(400).json({ message: "Invalid offer ID" });
        res.status(500).json({ message: "Failed to fetch offer" });
    }
});

//buyer cancels their own pending offer
router.patch("/:offerId/cancel", protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const offer = await Offer.findById(req.params.offerId);

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        if (!offer.buyer || offer.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to cancel this offer" });
        }

        if (offer.status !== "Pending") {
            return res.status(400).json({ message: "Only pending offers can be cancelled" });
        }

        offer.status = "Cancelled";
        const updatedOffer = await offer.save();

        res.json(updatedOffer);
    } catch (error) {
        if (error && error.name === "CastError") {
            return res.status(400).json({ message: "Invalid offer ID" });
        }

        console.error(error);
        res.status(500).json({ message: "Failed to cancel offer" });
    }
});

//seller accepts a pending offer
router.patch("/:offerId/accept", protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const offer = await Offer.findById(req.params.offerId);

        // prevent further actions on offer after it is accepted
        const existingAccepted = await Offer.findOne({
            listing: offer.listing,
            status: "Accepted"
        });

        if (existingAccepted) {
            return res.status(400).json({ message: "An offer has already been accepted for this listing" });
        }

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        // only seller can accept
        if (!offer.seller || offer.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to accept this offer" });
        }

        // only pending offers can be accepted
        if (offer.status !== "Pending") {
            return res.status(400).json({ message: "Only pending offers can be accepted" });
        }

        offer.status = "Accepted";

        // update linked listing status to Sold after accepting an offer
        const listing = await Listing.findById(offer.listing);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        listing.status = "Sold";
        await listing.save();

        // reject other offers under listing after accepting an offer
        await Offer.updateMany(
            {
                listing: offer.listing,
                _id: { $ne: offer._id }, // exclude accepted offer
                status: "Pending"
            },
            {
                $set: { status: "Rejected" }
            }
        );

        // ensure each listing only has one Transaction linked to it
        const existingTransaction = await Transaction.findOne({
            listing: offer.listing
        });

        if (existingTransaction) {
            return res.status(400).json({ message: "Transaction already exists for this listing" });
        }

        // create Transaction record after accepting an offer
        await Transaction.create({
            listing: offer.listing,
            buyer: offer.buyer,
            seller: offer.seller,
            offer: offer._id,
        });

        const updatedOffer = await offer.save();

        res.json(updatedOffer);

    } catch (error) {
        if (error && error.name === "CastError") {
            return res.status(400).json({ message: "Invalid offer ID" });
        }

        console.error(error);
        res.status(500).json({ message: "Failed to accept offer" });
    }
});

//seller rejects a pending offer
router.patch("/:offerId/reject", protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const offer = await Offer.findById(req.params.offerId);

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        // only seller can reject
        if (!offer.seller || offer.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to reject this offer" });
        }

        // only pending offers can be rejected
        if (offer.status !== "Pending") {
            return res.status(400).json({ message: "Only pending offers can be rejected" });
        }

        offer.status = "Rejected";
        const updatedOffer = await offer.save();

        res.json(updatedOffer);

    } catch (error) {
        if (error && error.name === "CastError") {
            return res.status(400).json({ message: "Invalid offer ID" });
        }

        console.error(error);
        res.status(500).json({ message: "Failed to reject offer" });
    }
});


export default router;  