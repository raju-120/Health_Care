import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    comments:{
        type: String,
        required: true
    }
});

export const Comments = mongoose.model('Comments', commentSchema);