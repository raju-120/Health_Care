import mongoose, { Schema } from "mongoose";

const advertiseSchema = new Schema({
    healthcarename: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    userRef:{
        type: String,
        required: true,
    }
},{timestamps: true});

const Advertising = mongoose.model('Advertise', advertiseSchema);

export default Advertising;