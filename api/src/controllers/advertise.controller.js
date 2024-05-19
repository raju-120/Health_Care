import Advertise from "../models/advertise.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/ApiResponse.js";


const advertise = asyncHandler(async(req, res, next) => {
    const {name, address,phone,avatar, userRef} = req.body;

    const advertises = await Advertise.create({
        name,
        address,
        phone,
        avatar,
        userRef
    });

    return res.status(201).json(
        new APIResponse(201,advertises,"Advertising posted successfully" )
    )
});


export {advertise}