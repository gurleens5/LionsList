import express from "express"
import { testMsg } from "../controllers/testController.js";

const router = express.Router();

router.get("/", testMsg);

export default router