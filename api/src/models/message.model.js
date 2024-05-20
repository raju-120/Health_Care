// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  readBy: { type: [String], default: [] },  // Track users who have read the message
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
