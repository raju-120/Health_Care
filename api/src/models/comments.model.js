import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true
    },
},{timestamps: true});

export const Comments = mongoose.model('Comments', commentSchema);