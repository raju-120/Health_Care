import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    username:{
        type: String,
        required: true,
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
        type: String,
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
        type: Array,
        required: true,
    } 
},{timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default  Doctor;