import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { Admin } from "../models/admin.model.js";
import { SystemAdmin } from "../models/systemAdmin.model.js";


export const verifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next();
    }catch(error){
        throw new ApiError(401, error?.message || "invalid access_token")
    }
})

                        //Doctors

   /*  export const docVerifyJwt = asyncHandler(async(req, _, next) => {
        try {
            //console.log('token:', req.header("Authorization")?.replace("Bearer ", "") )
            const token = req.header("Authorization")?.replace("Bearer ", "");
    
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log( req.cookies?.accessToken)
    
            const docUser = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
            
            console.log('I am here for decoded token', decodedToken);
    
            if ( !docUser) {
            const doctor = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
            console.log('I am here', doctor);
            req.docUser = docUser;
            next();
            } 
        }catch (error) {
            throw new ApiError(401, error?.message || "Invalid access token");
        };
    }); */


    export const docVerifyJwt = asyncHandler(async (req, res, next) => {
        try {
            //console.log('DOc: ',req.body.accessToken);
           /*  console.log('Doc Update access token: ',req.body); */
            
            const token = req.body.data.accessToken;

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const docUser = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
    
            if (!docUser) {
                throw new ApiError(401, "Doctor not found");
            }
    
            req.doctor = docUser;
            next();
        } catch (error) {
            next(new ApiError(401, error?.message || "Invalid access token"));
        }
    });

    export const docVerifyJwtForMessage = asyncHandler(async (req, res, next) => {
        try {
           /*  console.log('DOc: ',req.body); */
            
            const token = req.body.accessToken;

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const docUser = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
    
            if (!docUser) {
                throw new ApiError(401, "Doctor not found");
            }
    
            req.doctor = docUser;
            next();
        } catch (error) {
            next(new ApiError(401, error?.message || "Invalid access token"));
        }
    });

export const docUpVerifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.body?.accessToken;
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        /* console.log('I am here for decoded token', decodedToken);*/
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


export const AdminVerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        console.log('Token:', req.cookies?.accessToken);
        const token = req.cookies?.accessToken;

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
        const user = await Admin.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});



export const systemAdminVerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken;
        //console.log('Token Secret:', process.env.ACCESS_TOKEN_SECRET);
        //console.log('Token:', token);

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //console.log('Decoded Token:', decodedToken);

        const user = await SystemAdmin.findById(decodedToken?._id).select("-password -refreshToken");
        //console.log('User:', user);

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT Error:', error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});


export const conditionalAuth = (req, res, next) => {
    // Assume AdminVerifyJWT and systemAdminVerifyJWT are already defined
    if (AdminVerifyJWT(req, res, () => {}) || systemAdminVerifyJWT(req, res, () => {})) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
  


