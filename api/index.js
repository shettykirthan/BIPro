import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import userChatRoute from "./routes/userChat.routes.js"
import cookieParser from 'cookie-parser'
import cors from "cors"
dotenv.config()


const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors())


mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MOngoDB connected")
})
.catch(()=>{
    console.log("Unable to coonnect MOngoDb");
    
})


app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/user",userChatRoute)

app.listen(9001,()=>{
    console.log("Server is running");
    
})