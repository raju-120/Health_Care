import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { Admin } from "../models/admin.model.js";
import { SystemAdmin } from "../models/systemAdmin.model.js";


export const verifyJwt = asyncHandler(async(req, _, next) => {
    try {
        // Get the token from the users accessToken
        const token = req.body.data.accessToken || 
                      req.header("Authorization")?.replace("Bearer ", "") || 
                      req.body.accessToken

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

export const updateUserVerifyJwt = asyncHandler(async(req, _, next) => {
    try {
        // Get the token from the users accessToken
        const token = req.body.accessToken || req.header("Authorization")?.replace("Bearer ", "");

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

export const docVerifyJwt = asyncHandler(async (req, res, next) => {
    try {
        // Get the token from the Doctors accessToken
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
        // Get the token from the Doctors accessToken
        
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
        
        const user = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
       
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
        // get the Admin accessToken
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

export const docApproveVerifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.body?.accessToken;
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
        
        req.user = user;
        
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    };
});

export const systemAdminVerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req?.body?.accessToken;

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await SystemAdmin.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export const systemAdminJWTLOgout = asyncHandler(async (req, _, next) => {
    try {
        const token = req?.body?.data?.accessToken;

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await SystemAdmin.findById(decodedToken?._id).select("-password -refreshToken");
        
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
    if (AdminVerifyJWT(req, res, () => {}) || systemAdminVerifyJWT(req, res, () => {})) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
};