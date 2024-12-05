    import { Chat, UserChat } from "../models/userCHATS.model.js";


    export const createChat = async (req, res) => {
        try {
            const { user_id, csv_id } = req.params;
            const { user_message, model_response } = req.body; 

            
            const newChat = new Chat({ user_message, model_response });
            await newChat.save();

            
            let userChat = await UserChat.findOne({ user_id, csv_id });

            if (!userChat) {
                
                userChat = new UserChat({ user_id, csv_id, chat_ids: [newChat._id] });
            } else {
               
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
            const { user_id, csv_id } = req.params; 
            console.log(`Fetching chats for user_id: ${user_id}, csv_id: ${csv_id}`); 

 
            const userChat = await UserChat.findOne({ user_id, csv_id }).populate("chat_ids");

            console.log('UserChat found:', userChat);

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
            console.error('Error retrieving chats:', error); 
            res.status(500).json({
                success: false,
                message: "Error retrieving chats",
                error: error.message
            });
        }
    };
    export const newUserChat = async (req, res) => {
        const { user_id, csv_id } = req.params;
        const { user_message, model_response } = req.body;

        try {
         
            const newChat = await Chat.create({ user_message, model_response });

          
            const userChat = new UserChat({
                user_id,
                csv_id,
                chat_ids: [newChat._id],
                chat_title: user_message 
            });

        
            await userChat.save();

            res.status(201).json({
                success: true,
                message: 'New UserChat created successfully',
                chatId: newChat._id,
                chat_title: userChat.chat_title 
            });
        } catch (error) {
            console.error('Error creating new UserChat:', error);
            res.status(500).json({ success: false, message: 'Failed to create new UserChat', error: error.message });
        }
    };

    export const getAllUserChats = async (req, res) => {
        try {
            const { user_id } = req.params;
            console.log(`Fetching all chats for user_id: ${user_id}`);

            
            const userChats = await UserChat.find({ user_id }).populate("chat_ids");

            console.log('UserChats found:', userChats); 
            if (!userChats || userChats.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No chats found for this user"
                });
            }

            res.status(200).json({
                success: true,
                message: "Chats retrieved successfully",
                chats: userChats 
            });
        } catch (error) {
            console.error('Error retrieving chats:', error); 
            res.status(500).json({
                success: false,
                message: "Error retrieving chats",
                error: error.message
            });
        }
    };
    