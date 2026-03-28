import express from "express";
import Transaction from "../models/Transaction.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET all transactions for logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    
    res.json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

export default router;