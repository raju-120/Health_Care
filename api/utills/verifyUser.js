import jwt from "jsonwebtoken";
import { errorHandler } from "./error";

export const verifyToken = async(req,res,next) =>{
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, 'Unauthorized Access!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return next(errorHandler(403, 'Forbidden Access!'));

        req.user = user;
        next();
    })
}