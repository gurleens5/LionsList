import express from "express";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
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

    if (!tx) return res.status(404).json({ message: "Transaction not found" });

    if (String(tx.seller._id) !== String(req.user._id))
      return res.status(403).json({ message: "Cannot rate buyer" });

    if (tx.buyerRating) return res.status(400).json({ message: "Already rated buyer" });

    tx.buyerRating = rating;
    await tx.save();

    const buyer = await User.findById(tx.buyer._id);
    const currentRating = Number(buyer.buyerRating) || 0;
    const currentCount = Number(buyer.buyerRatingsCount) || 0;

    const newCount = currentCount + 1;
    const newAverage = ((currentRating * currentCount) + rating) / newCount;

    buyer.buyerRating = Math.min(newAverage, 5);
    buyer.buyerRatingsCount = newCount;

    await buyer.save();

    res.json({ message: "Buyer rated successfully", transaction: tx, buyer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit buyer rating" });
  }
});

router.post("/seller", protect, async (req, res) => {
  const { transactionId, rating } = req.body;

  if (!transactionId || !rating) {
    return res.status(400).json({ message: "Transaction ID and rating are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const tx = await Transaction.findById(transactionId).populate("buyer seller offer listing");

    if (!tx) return res.status(404).json({ message: "Transaction not found" });

    if (String(tx.buyer._id) !== String(req.user._id))
      return res.status(403).json({ message: "Cannot rate seller" });

    if (!tx.offer || tx.offer.status !== "Accepted")
      return res.status(400).json({ message: "Seller can only be rated for accepted offers" });

    if (String(tx.offer.buyer) !== String(tx.buyer._id))
      return res.status(400).json({ message: "Offer buyer does not match transaction buyer" });

    if (String(tx.offer.seller) !== String(tx.seller._id))
      return res.status(400).json({ message: "Offer seller does not match transaction seller" });

    if (String(tx.offer.listing) !== String(tx.listing._id))
      return res.status(400).json({ message: "Offer listing does not match transaction listing" });

    const existingRatedTransaction = await Transaction.findOne({
      offer: tx.offer._id,
      sellerRating: { $gt: 0 },
    });

    if (existingRatedTransaction)
      return res.status(400).json({ message: "Already rated seller" });

    tx.sellerRating = rating;
    await tx.save();

    const seller = await User.findById(tx.seller._id);
    const currentRating = Number(seller.sellerRating) || 0;
    const currentCount = Number(seller.sellerRatingsCount) || 0;

    const newCount = currentCount + 1;
    const newAverage = ((currentRating * currentCount) + rating) / newCount;

    seller.sellerRating = Math.min(newAverage, 5);
    seller.sellerRatingsCount = newCount;

    await seller.save();

    res.json({ message: "Seller rated successfully", transaction: tx, seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit seller rating" });
  }
});

export default router;