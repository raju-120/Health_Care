import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sendername: { 
        type: String,
        required: true 
    },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receivername: { 
        type: String,
        required: true 
    },
    pdfContent :{
        type: String,
        required: true,
    }
   /*  pdf: {
        url: { type: String, required: true }, 
        public_id: { type: String },          
        contentType: { type: String, default: 'application/pdf' },
    } */
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;

