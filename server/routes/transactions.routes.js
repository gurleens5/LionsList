import express from "express";
import Transaction from "../models/Transaction.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/transactions/my
router.get("/my", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { buyer: req.user._id },
        { seller: req.user._id }
      ]
    })
      .populate("listing")
      .populate("buyer", "username")
      .populate("seller", "username")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

export default router;