import listingsRoutes from "./routes/listings.routes.js";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import offersRoutes from "./routes/offers.routes.js";
import dns from "node:dns"
import transactionRoutes from "./routes/transactions.routes.js";
import userRoutes from "./routes/users.routes.js";
import ratingRoutes from "./routes/rating.routes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/listings", listingsRoutes);
app.use("/api", authRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions/rate", ratingRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});

