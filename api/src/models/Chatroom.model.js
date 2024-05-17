import mongoose from "mongoose";

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

export default Chatroom;

