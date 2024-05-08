import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token =  req.cookies?.accessToken  /* && req.header("Authorization")?.replace("Bearer ", "")  */;
        //console.log('I am here for user token : ',req.cookies?.accessToken);

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

});


export const docVerifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer ", "") ;

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        };

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        };

        //console.log('I am here for req doc: ', req.user = user);
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    };
});

export const docUpVerifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken /* || req.header("Authorization")?.replace("Bearer ", ""); */

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        };
        /* console.log(req.header("Authorization")?.replace("Bearer ", ""))
        console.log( req.cookies?.accessToken)
 */
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        /* console.log('I am here for decoded token', decodedToken);
 */
        const user = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
       /*  console.log('I am here', doctor); */
        if ( !user) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    };
});
