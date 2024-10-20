import express from "express";
import { createChat, getUserChats, newUserChat, getAllUserChats } from "../controllers/userChat.controller.js";

const router = express.Router();

router.post("/:user_id/csv/:csv_id/chat", createChat);


router.get("/:user_id/csv/:csv_id/chats", getUserChats);


router.get("/:user_id/chats", getAllUserChats);


router.post('/:user_id/csv/:csv_id/chat/new', newUserChat);

export default router;
