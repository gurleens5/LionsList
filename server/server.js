import express from "express";
import testRoutes from "./routes/testRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use("/", testRoutes);

connectDB();

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});

