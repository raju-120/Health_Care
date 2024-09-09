import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        max: 7
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
    price:{ 
        type: Number,
        required: true,
    },
    advPrice:{ 
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    time: {
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
    },
    role: { 
        type: String,
        default: 'doctor'
    },
    slots: { 
        type: Array,
        required: true,
    },
    onlineSlots: { 
        type: Array,
        required: true,
    }
},{timestamps: true});


doctorSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password, 10);
    next();
});
doctorSchema.methods.isPasswordCorrect = async function (password)
{  return await bcrypt.compare(password, this.password); };



doctorSchema.methods.generateAccessToken = function()
    {
        return jwt.sign({
            _id:  this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
    };


doctorSchema.methods.generateRefreshToken = function()
    {
        return jwt.sign(
            {
            _id:  this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
    )};

export const Doctor = mongoose.model('Doctor', doctorSchema);