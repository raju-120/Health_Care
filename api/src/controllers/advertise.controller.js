import Advertise from "../models/advertise.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/ApiResponse.js";


const advertise = asyncHandler(async(req, res, next) => {
    //const {name, address,phone,avatar, userRef} = req.body;

    const advertises = await Advertise.create(req.body);
    console.log("Data : ",advertises)
    return res.status(201).json(
        new APIResponse(201,advertises,"Advertising posted successfully" )
    )
});

const getAdvertise = asyncHandler(async(req, res, next) =>{
    const query = {};
    const result = await Advertise.find(query);
    res.status(201).json(
        new APIResponse(201, result, "All the advertises are passing.")
    )
})


export {advertise, getAdvertise}