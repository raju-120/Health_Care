import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1ONQXqXvCpLId6n-qBr_hq&ust=1709634587589000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPj47KOz2oQDFQAAAAAdAAAAABAE"
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
