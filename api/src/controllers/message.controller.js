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
        const sendername = req.body.username;
        const receivername = req.body.receivername;
		//console.log(':', )
		

        // Determine the room ID based on participants
        let conversation = await Chatroom.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Chatroom.create({
                participants: [senderId, receiverId,sendername,receivername],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            receivername,
            sendername
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
        const { senderId, receiverId} = req.params;
        const messages = await Chatroom.find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
          ]
        }).sort({ createdAt: 1 });

        console.log('message:', messages)

        res.json({ success: true, messages });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
};

export {
    sendMessage,
    getMessages
};
