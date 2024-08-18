import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { Admin } from "../models/admin.model.js";
import { SystemAdmin } from "../models/systemAdmin.model.js";


export const verifyJwt = asyncHandler(async(req, _, next) => {
    try {
        console.log("Logout", req.cookies );
        //console.log("Logout First", req.cookies?.accessToken);
        const token = req.body.data.accessToken || req.header("Authorization")?.replace("Bearer ", "")

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

export const docApproveVerifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.body?.accessToken;
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await Doctor.findById(decodedToken?._id).select("-password -refreshToken");
        console.log("TOken: ", user )
       
        /* if ( !user) {
            throw new ApiError(401, "Invalid Access Token")
        }  */
        req.user = user;
        
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    };
});

export const systemAdminVerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req?.body?.accessToken;
        console.log("TOken", token);
        

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

export const systemAdminJWTLOgout = asyncHandler(async (req, _, next) => {
    try {
        const token = req?.body?.data?.accessToken;
        console.log("TOken", token);
        

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
  


 /*  TOken {
    statusCode: 200,
    data: {
      user: {
        _id: '667400be1964800764cb62a3',
        username: 'System Admin',
        email: 'systemadmin@gmail.com',
        role: 'system-admin',
        createdAt: '2024-06-20T10:13:18.808Z',
        updatedAt: '2024-08-08T15:12:52.165Z',
        __v: 0,
        avatar: 'https://i.ibb.co/nCVy9M0/adminphoto.jpg'
      },
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MDBiZTE5NjQ4MDA3NjRjYjYyYTMiLCJlbWFpbCI6InN5c3RlbWFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiU3lzdGVtIEFkbWluIiwiaWF0IjoxNzIzMTMwMDM1LCJleHAiOjE3MjMzMDI4MzV9.R80ZxjeVM6p_ZbxAIsoxjxqtYMID5g8BdjVmTqqcdNk',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MDBiZTE5NjQ4MDA3NjRjYjYyYTMiLCJpYXQiOjE3MjMxMzAwMzUsImV4cCI6MTcyNDQyNjAzNX0.BYixFq-eQhyo-EJaJEpMj3nMRWb6z7uoCyQh2uppFUQ'
    },
    message: 'System logged in successfully',
    success: true
  } */