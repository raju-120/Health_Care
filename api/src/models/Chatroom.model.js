import mongoose from 'mongoose';

const chatroomSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);
export default Chatroom;