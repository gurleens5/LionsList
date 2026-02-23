import express from "express"
import { getTestObjects, createTestObject } from "../controllers/testController.js";

const router = express.Router();

router.get("/testobjects", getTestObjects);
router.post("/", createTestObject);

export default router