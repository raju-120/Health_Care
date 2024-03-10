import Advertise from "../models/advertise.model.js";

export const tested = (req, res) =>{
    res.json({
        message: 'Test is working',
    })
}

export const createAdvertise = async(req,res, next) =>{
    try{
        const advertised = await Advertise.create(req.body);
        res.status(200).json(advertised);
    }catch(error){
        next(error);
    }
}