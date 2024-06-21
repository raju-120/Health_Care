import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { SystemAdmin } from "../models/systemAdmin.model.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { cloudinary } from "../utils/cloudinaryConfig.js";



const generateSysAdminAccessAndRefreshTokens = async(sysAdminId) =>{
    try{
        const sysAdminUser = await SystemAdmin.findById(sysAdminId);
        const accessToken = sysAdminUser.generateAccessToken();
        const refreshToken = sysAdminUser.generateRefreshToken();

        sysAdminUser.refreshToken = refreshToken;
        await sysAdminUser.save({validateBeforeSave:  false});

        return {accessToken, refreshToken};
    }catch(error){
        throw new ApiError(500, error?.message || "something went wrong while generating refresh and access token.");
    }
};

const refreshSysAdminAccessToken = asyncHandler(async (req, res) =>{
    const incomingRefreshToken = req.cookies.refreshToken ||
                                req.body.refreshToken;

    if(incomingRefreshToken){
        throw new ApiError(401, "unauthorized access token");
    };

    try {
            const decodedToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )
            const user = await sysAdmin.findById(decodedToken?._id);

            if(!user){
                throw new ApiError(401, "Invalid refresh token")
            };

            if(incomingRefreshToken !== user?.refreshToken){
                throw new ApiError(401, "Refresh token is expired!");
            };

            const options = {
                httpOnly: true,
                secure: true,
                };

            const {accessToken,newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)
                .json(
                new APIResponse(
                    201,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access TOken refreshed"
                ));

    } catch (error) {
        new ApiError(401, error?.message || "Invalid refresh token")
    }
});

const systemAdminSignup= asyncHandler(async(req, res) =>{
    const {username,email,password,role} = req.body;
    const existedUser = await SystemAdmin.findOne({
        $or:[{ email }]
    });
    if(existedUser){
        throw new ApiError(402, "This email id already used")
    };
    const systemAdminUser = await SystemAdmin.create({username,email,password,role})

    const createdUser = await SystemAdmin.findById(systemAdminUser._id).select("-password -refreshToken");
    if(!createdUser) {
        throw new ApiError(500, "System admin id not created.There must be fill up all the fields!");
    };

    return res.status(201).json(
        new APIResponse(200, createdUser, "System Admin registered successfully.")
    )
});

const systemAdminSignIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email & Password required!");
    }

    const user = await SystemAdmin.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User email is not found!");
    }

    const validPassword = await user.isPasswordCorrect(password); // Call on instance
    if (!validPassword) {
        throw new ApiError(401, "System Admin password won't match!");
    }

    const accessToken = user.generateAccessToken(); // Call on instance
    const refreshToken = user.generateRefreshToken(); // Call on instance

    const loggedInUser = await SystemAdmin.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .json(new APIResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken
        }, "System logged in successfully"));
});

const systemAdminOut = asyncHandler(async (req, res) => {
    await SystemAdmin.findByIdAndUpdate(
        req?.user._id,
        console.log(req?.user._id),
        {
            $unset: {
                refreshToken: 1 // This will remove the field from the document
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true, 
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new APIResponse(200, {}, "System admin logged out"));
});

const adminSignup = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
    let avatarUrl = null;
  
    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'avatars',
        });
        avatarUrl = result.secure_url;
      }
  
      const newAdmin = new Admin({
        username,
        email,
        password,
        role: 'admin',
        avatar: avatarUrl,
      });
  
      await newAdmin.save();
  
      res.status(201).json({
        success: true,
        message: 'Admin added successfully',
        data: newAdmin,
      });
    } catch (error) {
      console.error('Error during image upload:', error);
      throw new ApiError(500, 'Image upload failed');
    } finally {
      // Clean up: Delete the temporary file after upload
      if (req.file) {
        const fs = require('fs');
        fs.unlinkSync(req.file.path); // Delete the temporary file
      }
    }
  });


const adminSignIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email & Password required!");
    }

    const user = await Admin.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User email is not found!");
    }

    const validPassword = await user.isPasswordCorrect(password); // Call on instance
    if (!validPassword) {
        throw new ApiError(401, "System Admin password won't match!");
    }

    const accessToken = user.generateAccessToken(); // Call on instance
    const refreshToken = user.generateRefreshToken(); // Call on instance

    const loggedInUser = await Admin.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .json(new APIResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken
        }, "Admin logged in successfully"));
});

const getAllAdminList = asyncHandler(async(req, res, next) =>{
    const query = {};
    const result = await Admin.find(query);
    res.status(201).json(
        new APIResponse(201, result, "All the Admin list founded.")
    )
});


const adminLogOut = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req?.user._id,
        console.log(req?.user._id),
        {
            $unset: {
                refreshToken: 1 // This will remove the field from the document
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true, 
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new APIResponse(200, {}, "Admin logged out"));
});







export {
    generateSysAdminAccessAndRefreshTokens,
    refreshSysAdminAccessToken,
    systemAdminSignup,
    systemAdminSignIn,
    adminSignup,
    adminSignIn,
    getAllAdminList,
    adminLogOut,
    systemAdminOut,
}