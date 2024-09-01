import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderusername: { 
        type: String,
        required: true 
    },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverusername: { 
        type: String,
        required: true 
    },
    message: { 
        type: String,
        required: true 
    },
    pdf: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
