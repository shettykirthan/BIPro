import express from "express";
import { createChat, getUserChats } from "../controllers/userChat.controller.js";
const router = express.Router();

// Route to create a new chat for a user
router.post("/:userId/csv/:csvId/chat", createChat);

// Route to get all chats for a user
router.get("/:userId/csv/:csvId/chats", getUserChats);

export default router;
