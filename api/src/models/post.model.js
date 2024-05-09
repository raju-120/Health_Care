import mongoose, { Schema } from "mongoose";

const postsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
        required: true,
    },
    comment:{
        type: Array,
    },
    avatar: {
        type: Array,
    },
},{timestamps: true});

const POST = mongoose.model('POST', postsSchema);
export default POST;