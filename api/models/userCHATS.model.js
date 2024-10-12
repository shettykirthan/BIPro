import mongoose from "mongoose";

// Chat Schema (for individual chat messages)
const chatSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        sender: {
            type: String,  // Either 'user' or 'model'
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chats", chatSchema);

// UserChat Schema (to track user chats and CSV ID)
const userChatSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        csv_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCSV",  // Reference to the uploaded CSV
            required: true
        },
        chat_ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chats"
        }]
    },
    { timestamps: true }
);

const UserChat = mongoose.model("UserChats", userChatSchema);

export { Chat, UserChat };
