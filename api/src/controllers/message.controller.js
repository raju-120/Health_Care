import Message from '../models/message.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {cloudinary} from '../utils/cloudinaryConfig.js';


const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message, senderusername, receiverusername } = req.body;
        
        let pdfUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "raw",
                format: "pdf",
                folder: "prescriptions"
            });

            pdfUrl = result.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            senderusername,
            receiverusername,
            pdf: {
                url: pdfUrl,
                contentType: req.file.mimetype
            }
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { sendMessage, getMessages};
