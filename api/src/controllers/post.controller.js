import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import POST from "../models/post.model.js";
import { APIResponse } from "../utils/ApiResponse.js";


const dropPost = asyncHandler(async (req, res)=>{
    const {username, descriptions, comment} = req.body ;
/*     
    if([username,description,comment].some((field) =>
     field?.trim() === "")
     ){
        throw new ApiError(400, "All fields are required");
     } */
    
/*     const avatarLocalPath =req.files?.avatar[2]?.path; */
    let avatarLocalPath;
    /* let avatarArray = [];

    req.files?.avatar */
  if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length >0 ){
        
        avatarLocalPath =req.files?.avatar[0]?.path;
        console.log(req.files?.avatar);
    } 
    //console.log("Avatar path name: ", avatarLocalPath);

/*     if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    } */

    let avatar;
    
    if(avatarLocalPath){

        avatar = await uploadOnCloudinary(avatarLocalPath);
    }
    // if(!avatar){
    //     throw new ApiError(400, "Avatar file is required");
    // };

    // console.log("Avatar: ", avatar);


    if(avatarLocalPath){
        const posting = await POST.create({
            username,
            descriptions,
            comment,
            avatar: avatar.url
        });
        if(!posting){
            throw new ApiError(500, "Somethings went wrong");
        };
    
        return res.status(201).json(
            new APIResponse(200, posting, "Posting a post successfully.")
        );
    }else{
        const posting = await POST.create({
            username,
            descriptions,
            comment,
        });
        if(!posting){
            throw new ApiError(500, "Somethings went wrong");
        };
    
        return res.status(201).json(
            new APIResponse(200, posting, "Posting a post successfully.")
        );
    }

});

const getPost = async (req, res,next) =>{
    const query = {};
    const result = await POST.find(query);
    
    return res.status(200).json(
        new APIResponse(200, result, "Posting all the post shown.")
    )
}

export {
    dropPost,
    getPost
};