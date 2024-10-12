import { Chat, UserChat } from "../models/userCHATS.model.js";

// Controller to create a new chat message
export const createChat = async (req, res) => {
    try {
        const { userId, csvId } = req.params;
        const { message, sender } = req.body;

        // Create a new chat message
        const newChat = new Chat({ message, sender });
        await newChat.save();

        // Find the user's chat record and update it with the new chat ID
        let userChat = await UserChat.findOne({ user_id: userId, csv_id: csvId });

        if (!userChat) {
            // If the user does not have a chat record, create a new one
            userChat = new UserChat({ user_id: userId, csv_id: csvId, chat_ids: [newChat._id] });
        } else {
            // Otherwise, push the new chat ID into the existing array
            userChat.chat_ids.push(newChat._id);
        }

        await userChat.save();

        res.status(201).json({
            success: true,
            message: "Chat created successfully",
            chat: newChat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating chat",
            error: error.message
        });
    }
};


export const getUserChats = async (req, res) => {
    try {
        const { userId, csvId } = req.params;

        // Find the user's chat record
        const userChat = await UserChat.findOne({ user_id: userId, csv_id: csvId }).populate("chat_ids");

        if (!userChat) {
            return res.status(404).json({
                success: false,
                message: "No chats found for this user and CSV"
            });
        }

        res.status(200).json({
            success: true,
            message: "Chats retrieved successfully",
            chats: userChat.chat_ids
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving chats",
            error: error.message
        });
    }
};