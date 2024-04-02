import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
import bcrypt from 'bcrypt';


const generateAccessAndRefreshTokens = async(userId) =>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:  false});

        return {accessToken, refreshToken}
    }catch(error){
        throw new ApiError(500, "something went wrong while generating refresh and access token.");
    }
}


const signup = asyncHandler(async(req, res) =>{
    const {username, email,password} = req.body;
    
    if(
        [username,email,password].some((field) => field?.trim() === "" )
    ){
        throw new ApiError(400, "All the field are required");
    };

    const existedUser = await User.findOne({
        $or: [{ email }]
    });
    
    if(existedUser){
        throw new ApiError(409, "Email are already existed!");
    };

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "User not created.There must some credential error!");
    };

    return res.status(201).json(
        new APIResponse(200, createdUser, "User register successfully.")
    )
    
    /* const hashedPassword = bcrypt.hashSync(password, 10);
    
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
    ); */
});


const signin = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    
    if(!email && !password){
        throw new ApiError(400, "Email & Password required!");
    }

    const user =await User.findOne({email});
    if(!user) {
        return ApiError(404, "User email is not found!");
    };
    
    const validPassword = await user.isPasswordCorrect(password);
    if(!validPassword) {
        new ApiError(404, "User password won't matched!");
    };

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json(
                new APIResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "user logged in successfully"
                )
            )
    
}); 

const logoutUser = asyncHandler (async(req, res) =>{
    await User.findByIdAndUpdate(
        req.user_id,
        {
            $unset: {
                refreshToken: 1 //this will removes the field from doc
            }
        },
        {
            new: true
        }
    )
    const options= {
        httpOnly: true, 
        secure: true
    }

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new APIResponse(200, {}, "User logged out"))
});


export {
        signup,
        signin,
        logoutUser,
    };