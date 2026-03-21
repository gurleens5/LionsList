import express from "express";

const router = express.Router();

//offer router placeholder
router.post("/", async (req, res) => {
    res.status(501).json({ message: "Create offer route not implemented yet" });
});

export default router;