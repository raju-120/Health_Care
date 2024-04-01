import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { APIResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const signup = async(req, res, next) =>{
    const {username, email,password,avatar} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const newUser = await User.create({
        username,
        email, 
        avatar,
        password : hashedPassword
    });
    if(!newUser) {
        return new ApiError(500, "User not created");
    }

    return res.status(201).json(
        new APIResponse(200, newUser, "User sign up created successfully.")
    );
};


export {signup};