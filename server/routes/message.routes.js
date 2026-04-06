import express from "express";
import Message from "../models/Message.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", protect, async (req, res) => {
  const { recipientId, listingId, content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Message cannot be empty" });
  }

  if (!recipientId || !listingId) {
    return res.status(400).json({ message: "Recipient and listing are required" });
  }

  try {
    const message = new Message({
      sender: req.user._id,
      receiver: recipientId,
      listing: listingId,
      msgContent: content.trim()
    });

    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "username")
      .populate("receiver", "username")
      .populate("listing", "title");


    res.json({ message: "Message sent successfully", messageData: populatedMessage });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "username")
      .populate("receiver", "username")
      .populate("listing", "title")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages" });

  }
});

export default router;