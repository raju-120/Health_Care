import { Medicine } from "../models/medicine.modal.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const medicineList= asyncHandler(async(req, res) =>{
    const {medicinename} = req.body;
    const addMedicine = await Medicine.create({medicinename});
    return res.status(201).json(
        new APIResponse(200, addMedicine, "Medicine added successfully.")
    )

});

const getMedicineLists = asyncHandler(async(req, res) =>{
    const query = {};
    const result = await Medicine.find(query);
    return res.status(201).json(
        new APIResponse(200, result, "All the mdedicine list found")
    )
})


export {
    medicineList,
    getMedicineLists
}