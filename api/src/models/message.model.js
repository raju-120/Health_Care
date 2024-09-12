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
        
    },
    pdfFile: {
        path: { type: String }, // path stored from multer
        contentType: { type: String, default: 'application/pdf' } // typically 'application/pdf'
      }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
