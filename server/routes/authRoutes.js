import express from "express"
import { register, verify, login, currentUser } from "../controllers/authController.js"
import { protect } from "../middleware/auth.js"
import User from "../models/User.js"
import { generateToken } from "../utils/generateToken.js"

const router = express.Router()

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.get("/me", protect, currentUser);
router.post("/demo", async (req, res) => {
    try {
        const user = await User.findOne({ email: "sgurleen@my.yorku.ca" });
        if (!user) return res.status(404).json({ message: "Demo account not found" });
        const token = generateToken(user._id);
        res.json({ id: user._id, username: user.username, email: user.email, token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router