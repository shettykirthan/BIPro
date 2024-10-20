import mongoose from "mongoose";

// Chat Schema (for individual chat messages)
const chatSchema = new mongoose.Schema(
    {
        user_message: {
            type: String,
            required: true
        },
        model_response: {
            type: String,
            
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
        chat_title: {
            type: String,
            default: "New Chat" // Initialize with 0 for new users
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
