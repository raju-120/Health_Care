import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
    bookingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    transactionId:{
        type: String,
        required: true
    },
    pname:{
        type: String,
        required: true
    } ,
},{timestamps: true});

export const Payment = mongoose.model("payment", paymentSchema);