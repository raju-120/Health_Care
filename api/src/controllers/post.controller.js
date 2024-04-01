import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import POST from "../models/post.model.js";
import { APIResponse } from "../utils/ApiResponse.js";

/* export const dropTest =(req, res) =>{
    res.status(200).json({
        message: "Posting method working"
    });
}; */


export const dropTest = asyncHandler(async (req, res) =>{
    res.status(201).json({
        message: "Drop a post api working 2 for you"
    });
});

const dropPost = asyncHandler(async (req, res)=>{
    const {username, description, comment} = req.body ;
    
    if([username,description,comment].some((field) =>
     field?.trim() === "")
     ){
        throw new ApiError(400, "All fields are required");
     }
    
/*     const avatarLocalPath =req.files?.avatar[2]?.path; */
    let avatarLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length >0 ){
        avatarLocalPath =req.files?.avatar[0]?.path;
    }
    console.log("Avatar path name: ", avatarLocalPath);

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    };

    console.log("Avatar: ", avatar);


    const posting = await POST.create({
        username,
        description,
        comment,
        avatar: avatar.urls
    });

    if(!posting){
        throw new ApiError(500, "Somethings went wrong");
    };

    return res.status(201).json(
        new APIResponse(200, posting, "Posting a post successfully.")
    );

});

export {dropPost};