import { Chat, UserChat } from "../models/userCHATS.model.js";

// Controller to create a new chat message
export const createChat = async (req, res) => {
    try {
        const { user_id, csv_id } = req.params; // Extract user_id and csv_id from params
        const { user_message, model_response } = req.body; // Extract the chat data from the request body

        // Create a new chat message
        const newChat = new Chat({ user_message, model_response });
        await newChat.save();

        // Find the user's chat record and update it with the new chat ID
        let userChat = await UserChat.findOne({ user_id, csv_id });

        if (!userChat) {
            // If the user does not have a chat record, create a new one
            userChat = new UserChat({ user_id, csv_id, chat_ids: [newChat._id] });
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
        const { user_id, csv_id } = req.params; // Extract user_id and csv_id from params
        console.log(`Fetching chats for user_id: ${user_id}, csv_id: ${csv_id}`); // Log incoming parameters

        // Find the user's chat record and populate the chat IDs
        const userChat = await UserChat.findOne({ user_id, csv_id }).populate("chat_ids");

        console.log('UserChat found:', userChat); // Log the result of the query

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
        console.error('Error retrieving chats:', error); // Log error details
        res.status(500).json({
            success: false,
            message: "Error retrieving chats",
            error: error.message
        });
    }
};
