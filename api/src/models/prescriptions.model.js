import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicines: [{ name: String, dosage: String }],
  pdfUrl: { type: String, required: true },
}, { timestamps: true });

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
