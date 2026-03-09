// import testRoutes from "./routes/testRoutes.js";
import express from "express";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json())
app.use("/api", authRoutes);
app.use(cors());
app.use("/api/users", authRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});

