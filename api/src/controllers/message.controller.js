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
        const senderusername = req.body.sendername;
        const receiverusername = req.body.receiverusername;
        console.log(senderusername)
        console.log(receiverusername)
		
		
        // Determine the room ID based on participants
       /*  let conversation = await Chatroom.findOne({
            participants: { $all: [senderId, receiverId,senderusername,receiverusername] },
        });
        if (!conversation) {
            conversation = await Chatroom.create({
                participants: [senderId, receiverId,senderusername,receiverusername],
            });
        } */
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            senderusername,
            receiverusername
        });
    
       /*  if (newMessage) {
            conversation.messages.push(newMessage._id);
        } */
        await  newMessage.save();

        const query1 = {senderId,receiverId};
        console.log(query1)
        const query2 = {senderId:receiverId,receiverId:senderId};
        console.log(query2)
        const result = await Message.find(query1);
        const result1 = await Message.find(query2);
        let combinedData = result.concat(result1);

        res.status(201).json(combinedData);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
		console.log(senderId,receiverId);
        const query1 = {senderId,receiverId};
        console.log(query1)
        const query2 = {senderId:receiverId,receiverId:senderId};
        console.log(query2)
        const result = await Message.find(query1);
        const result1 = await Message.find(query2);
        let combinedData = result.concat(result1);

        res.status(201).json(combinedData)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export {
    sendMessage,
    getMessages
};