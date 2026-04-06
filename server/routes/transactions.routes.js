import express from "express";
import Transaction from "../models/Transaction.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/transactions/my
router.get("/my", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user._id }, { seller: req.user._id }],
    })
      .populate("listing")
      .populate("offer")
      .populate("buyer", "username")
      .populate("seller", "username")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// POST /api/transactions/rate/seller
router.post("/rate/seller", protect, async (req, res) => {
  try {
    const { transactionId, rating } = req.body;

    if (!transactionId || rating === undefined) {
      return res.status(400).json({ message: "Transaction ID and rating are required." });
    }

    const numericRating = Number(rating);

    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    const transaction = await Transaction.findById(transactionId).populate("offer");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    if (String(transaction.buyer) !== String(req.user._id)) {
      return res.status(403).json({ message: "Only the buyer can rate the seller." });
    }

    if (!transaction.offer || transaction.offer.status !== "Accepted") {
      return res.status(400).json({ message: "Seller can only be rated for accepted offers." });
    }

    if (transaction.sellerRating && transaction.sellerRating > 0) {
      return res.status(400).json({ message: "Seller has already been rated for this transaction." });
    }

    transaction.sellerRating = numericRating;
    await transaction.save();

    res.status(200).json({
      message: "Seller rated successfully.",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit seller rating." });
  }
});

export default router;