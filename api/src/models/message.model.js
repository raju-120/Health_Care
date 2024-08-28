import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
        },

    senderusername: {
         type: String 
        },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
        },
    receiverusername: { 
        type: String 
    },
    message: { 
        type: String, required: true 
    },
    pdf: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
