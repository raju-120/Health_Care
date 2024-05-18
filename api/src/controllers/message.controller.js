import Chatroom from "../models/Chatroom.model.js";
import Message from "../models/message.model.js";
import { io, socketIdMap } from "../index.js"; // Ensure io and socketIdMap are imported from the correct file

const getReceiverSocketId = (receiverId) => {
    return socketIdMap.get(receiverId);
};

const sendMessage = async (req, res) => {
    try {
		console.log("i am here for message: ",req.body);
		const { message } = req.body;
        const receiverId = req.body.receiverId;
        const senderId = req.body.senderId;
		
		

        // Determine the room ID based on participants
        let conversation = await Chatroom.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Chatroom.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        console.log('I am here newMessage:', newMessage);

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const roomId = conversation._id.toString();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", { ...newMessage._doc, roomId });
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
		console.log('i am here for doc data', req.body)
        const { id: userToChatId } = req.params;
        const senderId = req.body.senderId;

        const conversation = await Chatroom.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    sendMessage,
    getMessages
};
