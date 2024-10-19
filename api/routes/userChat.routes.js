import express from "express";
import { createChat, getUserChats } from "../controllers/userChat.controller.js";

const router = express.Router();

// Route to create a new chat message
router.post("/:user_id/csv/:csv_id/chat", createChat);

// Route to retrieve chats for a specific user and CSV
router.get("/:user_id/csv/:csv_id/chats", getUserChats);

export default router;
