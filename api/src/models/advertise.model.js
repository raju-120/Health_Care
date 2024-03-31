import mongoose, { Schema } from "mongoose";

const advertiseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required:  true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    avatar: {
        type: Array,
        required: true,
        unique : true,
    },
    userRef: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Advertise = mongoose.model('Advertise', advertiseSchema);
export default Advertise;