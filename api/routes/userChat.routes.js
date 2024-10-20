import express from "express";
import { createChat, getUserChats, newUserChat, getAllUserChats } from "../controllers/userChat.controller.js";

const router = express.Router();

// Route to create a new chat message
router.post("/:user_id/csv/:csv_id/chat", createChat);

// Route to retrieve chats for a specific user and CSV
router.get("/:user_id/csv/:csv_id/chats", getUserChats);

// Route to retrieve all chats for a specific user
router.get("/:user_id/chats", getAllUserChats);

// Route to create a new chat entry (this can also be reused)
router.post('/:user_id/csv/:csv_id/chat/new', newUserChat);

export default router;
