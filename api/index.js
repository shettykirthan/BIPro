import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import userChatRoute from "./routes/userChat.routes.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();

const app = express();

// Increase JSON and URL-encoded payload limits
app.use(express.json({ limit: '10mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded payload limit

app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Unable to connect to MongoDB");
    });

// Define routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userChatRoute);

app.listen(9001, () => {
    console.log("Server is running on port 9001");
});
