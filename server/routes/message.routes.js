import express from "express";
import Message from "../models/Message.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", protect, async (req, res) => {
  const { recipientId, listingId, content } = req.body;

  try {
    const message = new Message({
      sender: req.user._id,
      recipient: recipientId,
      listing: listingId,
      content: content.trim()
    });

    await message.save();

    res.json({ message: "Message sent successfully", message });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

export default router;