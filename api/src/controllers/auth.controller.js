import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async(userId) =>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:  false});

        return {accessToken, refreshToken}
    }catch(error){
        throw new ApiError(500, error?.message || "something went wrong while generating refresh and access token.");
    }
};

const generateDocAccessAndRefreshTokens = async(docUserId) =>{
    try{
        const docUser = await Doctor.findById(docUserId);
        const accessToken = docUser.generateAccessToken();
        const refreshToken = docUser.generateRefreshToken();

        docUser.refreshToken = refreshToken;
        await docUser.save({validateBeforeSave:  false});

        return {accessToken, refreshToken};
    }catch(error){
        throw new ApiError(500, error?.message || "something went wrong while generating refresh and access token.");
    }
};

const refreshAccessToken = asyncHandler(async (req, res) =>{
    const incomingRefreshToken = req.cookies.refreshToken ||
                                req.body.refreshToken;

    if(incomingRefreshToken){
        throw new ApiError(401, "unauthorized access token");
    };

    try {
            const decodedToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )
            const user = await User.findById(decodedToken?._id);

            if(!user){
                throw new ApiError(401, "Invalid refresh token")
            };

            if(incomingRefreshToken !== user?.refreshToken){
                throw new ApiError(401, "Refresh token is expired!");
            };

            const options = {
                httpOnly: true,
                secure: true,
                };

            const {accessToken,newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)
                .json(
                new APIResponse(
                    201,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access TOken refreshed"
                ));

    } catch (error) {
        new ApiError(401, error?.message || "Invalid refresh token")
    }
});

const refreshDocAccessToken = asyncHandler(async (req, res) =>{
    const incomingRefreshToken = req.cookies.refreshToken ||
                                req.body.refreshToken;

    if(incomingRefreshToken){
        throw new ApiError(401, "unauthorized access token");
    };

    try {
            const decodedToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )
            const user = await Doctor.findById(decodedToken?._id);

            if(!user){
                throw new ApiError(401, "Invalid refresh token")
            };

            if(incomingRefreshToken !== user?.refreshToken){
                throw new ApiError(401, "Refresh token is expired!");
            };

            const options = {
                httpOnly: true,
                secure: true,
                };

            const {accessToken,newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)
                .json(
                new APIResponse(
                    201,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access TOken refreshed"
                ));

    } catch (error) {
        new ApiError(401, error?.message || "Invalid refresh token")
    }
});


const signup = asyncHandler(async(req, res) =>{
    const {username, email,password} = req.body;

    /* if(
        [username,email,password].some((field) => field?.trim() === "" )
    ){
        throw new ApiError(400, "All the field are required");
    }; */

    const existedUser = await User.findOne({
        $or: [{ email }]
    });

    if(existedUser){
        throw new ApiError(409, "Email are already existed!");
    };

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "User not created.There must some credential error!");
    };

    return res.status(201).json(
        new APIResponse(200, createdUser, "User register successfully.")
    )

    /* const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
        username,
        email,
        avatar,
        password : hashedPassword
    });
    if(!newUser) {
        return new ApiError(500, "User not created");
    }

    return res.status(201).json(
        new APIResponse(200, newUser, "User sign up created successfully.")
    ); */
});


const signin = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    
    if(!email && !password){
        throw new ApiError(400, "Email & Password required!");
    }

    const user =await User.findOne({email});
    if(!user) {
        return ApiError(404, "User email is not found!");
    };
    
    const validPassword = await user.isPasswordCorrect(password);
    if(!validPassword) {
        new ApiError(404, "User password won't matched!");
    };

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new APIResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "user logged in successfully"
                )
            )
        }
    );

const google= asyncHandler(async( req, res) =>{
    try{
        const user = await User.findOne({email});
        if(user){
            const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
            const loggedInUser = await findById(user._id).select("-password -refreshToken");
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) +
                                        Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const user = new User.create({
                username: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            const createdUser = await User.findById(user._id).select(
                "-password -refreshToken"
            ) ;
            if(!createdUser) {
                throw new ApiError(500, "Google user not created.There must some credential error!");
            };
        
            return res.status(201).json(
                new APIResponse(200, createdUser, "Google user register successfully.")
            )

        }
    }catch(error){
        throw new ApiError(error?.message || "Google user registration failed!");
    }
})

const logoutUser = asyncHandler (async(req, res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 //this will removes the field from doc
            }
        },
        {
            new: true
        }
    )
    const options= {
        httpOnly: true, 
        secure: true
    }

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new APIResponse(200, {}, "User logged out"))
});

const docLogoutUser = asyncHandler (async(req, res) =>{

    console.log("here I am")
    await Doctor.findByIdAndUpdate(
        req.body.data.user._id,
        {
            $unset: {
                refreshToken: 1 //this will removes the field from doc
            }
        },
        {
            new: true
        }
    )
    const options= {
        httpOnly: true,
        secure: true
    }
    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new APIResponse(200, {}, "Doc User logged out"))
});




const doctorSignUp = asyncHandler(async(req, res) =>{
    const {username,email,bmdc,specialty,qualification,designation,institute,
        department,phone,appointmentnumber,address ,avatar,password} 
        = req.body;
    
    /* if(
        [username,email,bmdc,specialty,qualification,designation,institute,
            department,phone,appointmentnumber,address,avatar,password].some((field) =>field?.trim() === "")
    ){
        throw new ApiError(400, "All the fields are required!")
    }; */

    const existedUser = await Doctor.findOne({
        $or:[{ email }]
    });
    if(existedUser){
        throw new ApiError(402, "This email id already used")
    };

    const docUser = await Doctor.create({
        username,
        email,
        bmdc,
        specialty,
        qualification,
        designation,
        institute,
        department,
        phone,
        appointmentnumber,
        address,
        avatar,
        password
    });
    const createdUser = await Doctor.findById(docUser._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Doctor's id not created.There must be fill up all the fields!");
    };

    return res.status(201).json(
        new APIResponse(200, createdUser, "Doctor registered successfully.")
    )
});

const doctorSignIn = asyncHandler(async(req, res)=>{
    const {email, password } = req.body;

    if(!email && !password){
        throw new ApiError(400, "Email & Password required!");
    };

    const docUser = await Doctor.findOne({email});
    if(!docUser){
        throw new ApiError(401, "Doctor email not found!");
    };

    const validPassword = await docUser.isPasswordCorrect(password);
    if(!validPassword) {
        new ApiError(404, "User password won't matched!");
    };

    const {accessToken, refreshToken} = await generateDocAccessAndRefreshTokens(docUser._id);

    const docLoggedIn = await Doctor.findById(docUser._id);

    const options= {
        httpOnly: true,
        secure: true,
    };

    return res
            .status(200)
            .cookie("accessToken",  options)
            .cookie("refreshToken",  options)
            .json(
                new APIResponse(
                    200,
                    {
                        user: docLoggedIn, accessToken, refreshToken
                    },
                    "Doctor logged in successfully"
                )
            )

});

const userUpdate = asyncHandler(  async (req, res) =>{
        /* if(req.user?._id !== req.params?.id){
            throw new ApiError(401, 'You can only update your own details!');
        }; */

        try{
            const{  username, email,password,avatar } = req.body;

        const user =await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    username,
                    email,
                    password,
                    avatar
                }
            },
            {new : true}
        )

        return res
            .status(200)
            .json(new APIResponse(200, user, 'Account details updated successfully.'))
        }catch(error){
            console.log('Something went wrong in update section: ', error.message);
        }
    }
);

const doctorUpdate = asyncHandler( async(req, res, next) =>{
    /* if(req.doctor.id !== req.params.id){
        throw new ApiError(401, 'You can only update your own details!');
    } */
    console.log('Doctor id: ', req.body);
    try{
        const {
            username,
            email,
            password,
            avatar,
            bmdc,
            specialty,
            qualification,
            designation,
            institute,
            department,
            phone,
            appointmentnumber,
            address
        } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const doctorUserUpdate = await Doctor.findByIdAndUpdate(
            req.doctor.id,
            {
                $set: {
                    username,
                    email,
                    password: hashedPassword,
                    avatar,
                    bmdc,
                    specialty,
                    qualification,
                    designation,
                    institute,
                    department,
                    phone,
                    appointmentnumber,
                    address
                }
            },{new: true},
        )

        return res
                .status(200)
                .json(new APIResponse(200, doctorUserUpdate,"Doctor Details update successfully"))
    }catch(error){
        console.log('Something went wrong in doctor update section: ', error.message);
    }
} );

const getAllDoctors = asyncHandler(async (req, res, next) =>{
    const query = {};
    const result = await Doctor.find(query);
    res.status(201).json(
        new APIResponse(201, result, "All the doctors a shown.")
    )
});

const getSpecificDoctor = asyncHandler(async(req, res, next) =>{
    const query = req.params.id;
    const result = await Doctor.findById(query);
    res.status(201).json(
        new APIResponse(201, result,"Specific doctor details ar provided.")
    )
});

const getAllUsers = asyncHandler(async(req , res, next) =>{
    const query = {};
    const result = await User.find(query);
    res.status(201).json(
        new APIResponse(201,result, "All Users provided.")
    );
})


export {
        signup,
        signin,
        logoutUser,
        docLogoutUser,
        google,
        doctorSignUp,
        doctorSignIn,
        userUpdate,
        doctorUpdate,
        refreshAccessToken,
        refreshDocAccessToken,
        generateDocAccessAndRefreshTokens,
        getAllDoctors,
        getSpecificDoctor,
        getAllUsers,
    };