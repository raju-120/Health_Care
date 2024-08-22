import { BloodDoner } from "../models/bloodDonner.model.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const bloodDonnerRegister = asyncHandler(async(req, res) =>{
    console.log(req.body);
    const {firstname,lastname,email,phone,division,area,lastdonatedate,bloodgroup} = req.body;

    const existedUser = await BloodDoner.findOne({
        $or : [{email}]
    })
    if(existedUser){
        throw new ApiError("This user already registered");
    }

    const user = await BloodDoner.create({
        firstname,
        lastname,
        email,
        phone,
        division,
        area,
        lastdonatedate,
        bloodgroup
    });

    return res
            .status(201)
            .json(
                    new APIResponse(201, user, 'Blood Donner register successfully')
                )
});

const bloodDonerlists = asyncHandler(async(req, res) =>{
    const {bloodgroup} = req.body;
    const query = bloodgroup? {bloodgroup}: {};

    /* if(bloodgroup){
        query.bloodgroup = bloodgroup;
    } */

    const result = await BloodDoner.find(query);
    res.status(201).json(
        new APIResponse(201,result, 'All the Blood Doner list have found')
    )
});


export {
    bloodDonnerRegister,
    bloodDonerlists,
}