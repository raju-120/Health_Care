import mongoose, { Schema } from "mongoose";

const complainSchema = new Schema({
    firstname: {
        type: String,
        required:  true,
    },
    lastname : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    remark: {
        type: String,
        required: true,
    }
},{timestamps: true});

export const Complain = mongoose.model('Complain', complainSchema) ;