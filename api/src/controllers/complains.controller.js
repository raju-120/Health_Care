import { Complain } from "../models/complain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {APIResponse} from "../utils/ApiResponse.js";


const complains = asyncHandler(async(req, res) =>{
    const {firstname, lastname, email, phone, remark} = req.body;

    const complainBox = await Complain.create({
        firstname,
        lastname,
        email,
        phone,
        remark
    });

    return res.status(201).json(
        new APIResponse(200 , complainBox, 'Complained Successfully.')
    )
});

const getComplains = asyncHandler(async(req, res) =>{
    const query = {};
    const result = await Complain.find(query);
    return res.status(201).json(
        new APIResponse(201, result, 'Get all the complained.')
    )
})

export {
    complains,
    getComplains
}