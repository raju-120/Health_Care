import mongoose, { Schema } from "mongoose";

const postsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    comment:{
        type: String,
    },
    avatar: {
        type: String,
        path: '/uploads'
    },
},{timestamps: true});

const POST = mongoose.model('POST', postsSchema);
export default POST;