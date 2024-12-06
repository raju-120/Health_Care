import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import POST from "../models/post.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import Services from "../models/services.js";
import Solutions from "../models/Solution.model.js";

// Social Media Type post method
const dropPost = asyncHandler(async (req, res)=>{
    const {username, descriptions, comment} = req.body ;

    let avatarLocalPath;

    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length >0 ){
        
        avatarLocalPath =req.files?.avatar[0]?.path;
        console.log(req.files?.avatar);
    } 

    let avatar;
    
    if(avatarLocalPath){

        avatar = await uploadOnCloudinary(avatarLocalPath);
    }

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
};

const getAllServices = asyncHandler(async(req,res,next)=>{
    const query = {};
    const result = await Services.find(query);
    res.status(201).json( new APIResponse(201, result, 'services are provided'));
});


const getSpecificService = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params._id
        const service = await Services.findById(req.params.id);
        if (!service) {
            return res.status(404).json(new APIResponse(404, null, 'Service not found'));
        }
        res.status(200).json(new APIResponse(200, service, 'Specific service'));
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json(new APIResponse(500, null, 'Server error'));
    }
});


const getAllSolution = asyncHandler(async(req,res,next)=>{
    const query = {};
    const result = await Solutions.find(query);
    res.status(201).json( new APIResponse(201, result, 'services are provided'));
});

const getSpecificSolution = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params._id
        const service = await Solutions.findById(req.params.id);
        if (!service) {
            return res.status(404).json(new APIResponse(404, null, 'Service not found'));
        }
        res.status(200).json(new APIResponse(200, service, 'Specific service'));
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json(new APIResponse(500, null, 'Server error'));
    }
});

export {
    dropPost,
    getPost,
    getAllServices,
    getSpecificService,
    getAllSolution,
    getSpecificSolution
};