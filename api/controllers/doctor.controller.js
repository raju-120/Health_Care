import Doctor from "../models/doctor.model.js"

export const doctorLists = async (req, res, next) =>{
    try{
        const lists = await Doctor.find();
        res.status(201).json(lists);
    }catch(error){
        next(error);
    }
}