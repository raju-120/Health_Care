import { BloodDoner } from "../models/bloodDonner.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const bloodDonnerRegister = asyncHandler(async(req, res) =>{
    const {firstname,lastname,email,phone,division,area,lastdonatedate,bloodgroup} = req.body;

    const existedUser = await BloodDoner.findOne({
        $or : [{email}]
    })
    if(existedUser){
        return res.status(500).json({ message: 'This user email already registered' });
    }

    try{
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
        console.log("User: ", user);
    return res
    .status(201)
    .json(
            new APIResponse(201, user, 'Blood Donner register successfully')
        )
    }catch(error){
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});

const bloodDonerlists = asyncHandler(async(req, res) =>{
    const {bloodgroup} = req.body;
    const query = bloodgroup? {bloodgroup}: {};

    const result = await BloodDoner.find(query);
    res.status(201).json(
        new APIResponse(201,result, 'All the Blood Doner list have found')
    )
});


export {
    bloodDonnerRegister,
    bloodDonerlists,
}