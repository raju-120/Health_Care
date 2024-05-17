import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		chatroom: {
			type: mongoose.Schema.Types.ObjectId,
			required: "Chatroom is required!",
			ref: "Chatroom",
		  },
		senderId: {
			type: String,
			ref: "User",
			required: true,
		},
		
		receiverId: {
			type: String,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},/* 
		timestamp: {
			type: Date,
			default: Date.now
		},
		time: {
			type: Number,
			required: true,
		} */
		// createdAt, updatedAt
	}
);

const Message = mongoose.model("Message", messageSchema);

export default Message;