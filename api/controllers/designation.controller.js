import listDesignaton from '../models/listdesignation.model.js';

export const listDesignatons = async(req, res, next) =>{
    try{
        const lists = await listDesignaton();
        console.log(lists);
        res.status(200).json(lists);
    } catch(error) {
        next(error);
    }
};