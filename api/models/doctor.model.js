import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    bmdc:{
        type: String,
        required: true,
        unique: true,
    },
    specialty:{
        type: String,
        required: true,
    },
    qualification:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    },
    institute:{
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    appointmentnumber:{
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        required: true,
        default: "https://www.pngitem.com/pimgs/m/193-1937755_feature-doctor-login-hd-png-download.png"
    }
},{timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default  Doctor;