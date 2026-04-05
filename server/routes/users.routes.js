import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(id).select("username rating ratingsCount");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;