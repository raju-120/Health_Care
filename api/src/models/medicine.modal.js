import mongoose, {  Schema } from "mongoose";

const medicineSchema = new Schema({
    medicinename:{
        type: String,
        required: true
    }
},{timestamps: true});


export const Medicine = mongoose.model('Medicine', medicineSchema)