import express from "express"
import { register, verify, login, currentUser } from "../controllers/authController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.get("/me", protect, currentUser);

export default router