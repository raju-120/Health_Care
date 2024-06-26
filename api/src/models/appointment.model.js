
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    appointmentSlots: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    permission: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending', 
    },
    paid: { type: Boolean, default: false },
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
