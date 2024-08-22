import mongoose, { Schema } from "mongoose";

const bloodDonnerSchema = new Schema({
    firstname : {
        type: String,
        required: true,
    },
    lastname :{
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    lastdonatedate : {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    bloodgroup: {
        type: String,
        required: true,
    }
});


export const BloodDoner = mongoose.model("BloodDonner", bloodDonnerSchema);