import mongoose, { mongo, Schema } from "mongoose";

const medicineSchema = new Schema({
    name:{
        type: String,
        required: true
    }
});


export const Medicine = mongoose.model('Medicine', medicineSchema)