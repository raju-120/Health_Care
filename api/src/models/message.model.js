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
    pdfFile: {  // Storing binary PDF data and its content type
        data: { type: Buffer },  // Binary data of the PDF
        contentType: { type: String, default: 'application/pdf' }  // Typically 'application/pdf'
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
