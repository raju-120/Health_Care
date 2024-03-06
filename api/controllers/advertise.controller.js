import Advertising from "../models/advertise.model.js";

export const tested = (req,res) =>{
    res.json({
        message: 'Advertising Sending Successfully.'
    })
}; 

export const createAdvertise = async(req,res,next) =>{
    try{
        const advertise = await Advertising.create(req.body);
        res.status(200).json(advertise);

    }catch(error){
        next(error)
    }
}