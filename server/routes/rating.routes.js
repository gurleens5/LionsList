import express from "express";
import Transaction from "../models/Transaction.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/buyer", protect, async (req, res) => {
  const { transactionId, rating } = req.body;

  if (!transactionId || !rating) {
    return res.status(400).json({ message: "Transaction ID and rating are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const tx = await Transaction.findById(transactionId).populate("buyer seller");

    if (!tx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (String(tx.seller._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "Cannot rate buyer" });
    }

    if (tx.buyerRating) {
      return res.status(400).json({ message: "Already rated buyer" });
    }

    res.json({ message: "Buyer rated successfully", transaction: tx });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit buyer rating" });
  }
});

export default router;