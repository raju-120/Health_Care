import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    useravatar:{
        type: String,
        required: true,
    },
    pId:{
        type: String,
        required: true,
    },
    uId: {
        type: String,
        required: true,
    },
    comments:{
        type: String,
        required: true
    },
},{timestamps: true});

export const Comments = mongoose.model('Comments', commentSchema);