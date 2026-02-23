import express from "express";
import testRoutes from "./routes/testRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json())

app.use("/", testRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});

