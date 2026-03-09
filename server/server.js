import listingsRoutes from "./routes/listings.routes.js";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/listings", listingsRoutes);
app.use("/api", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});

