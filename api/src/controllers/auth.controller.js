import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Department } from "../models/department.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cloudinary } from "../utils/cloudinaryConfig.js";
import fs from "fs";
import { Appointment } from "../models/appointment.model.js";

// export const generateAccessToken = (userId) => {
//   if (!process.env.ACCESS_TOKEN_SECRET) {
//     throw new Error("ACCESS_TOKEN_SECRET is not set in environment variables.");
//   }

//   return jwt.sign(
//     { _id: userId }, // Payload: user ID
//     process.env.ACCESS_TOKEN_SECRET, // Secret key
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d", // Expiry (default 15 minutes)
//     },
//   );
// };
// export const generateRefreshToken = (userId) => {
//   if (!process.env.REFRESH_TOKEN_SECRET) {
//     throw new Error(
//       "REFRESH_TOKEN_SECRET is not set in environment variables.",
//     );
//   }

//   return jwt.sign(
//     { _id: userId }, // Payload: user ID
//     process.env.REFRESH_TOKEN_SECRET, // Secret key
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d", // Expiry (default 7 days)
//     },
//   );
// };

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "something went wrong while generating refresh and access token.",
    );
  }
};

const generateDocAccessAndRefreshTokens = async (docUserId) => {
  try {
    const docUser = await Doctor.findById(docUserId);
    const accessToken = docUser.generateAccessToken();
    const refreshToken = docUser.generateRefreshToken();

    docUser.refreshToken = refreshToken;
    await docUser.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "something went wrong while generating refresh and access token.",
    );
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (incomingRefreshToken) {
    throw new ApiError(401, "unauthorized access token");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired!");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new APIResponse(
          201,
          { accessToken, refreshToken: newRefreshToken },
          "Access TOken refreshed",
        ),
      );
  } catch (error) {
    new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const refreshDocAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (incomingRefreshToken) {
    throw new ApiError(401, "unauthorized access token");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await Doctor.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired!");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new APIResponse(
          201,
          { accessToken, refreshToken: newRefreshToken },
          "Access TOken refreshed",
        ),
      );
  } catch (error) {
    new ApiError(401, error?.message || "Invalid refresh token");
  }
});

/* User Signin & SignUp */
const signup = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, "Email are already existed!");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "User not created.There must some credential error!",
    );
  }

  return res
    .status(201)
    .json(new APIResponse(200, createdUser, "User register successfully."));

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

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Sign in", req.body);

  // Validate input
  if (!email || !password) {
    throw new ApiError(400, "Email & Password are required!");
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User email not found!");
  }

  // Compare hashed password with the provided password
  const validPassword = await user.isPasswordCorrect(password);
  if (!validPassword) {
    throw new ApiError(401, "Invalid password!");
  }

  // Generate access and refresh tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token to the database
  user.refreshToken = refreshToken;
  await user.save();

  // Exclude sensitive fields from the user object
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // Set cookies for access and refresh tokens
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
    sameSite: "Strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new APIResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );
});

const specificUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "User Id is required");
  }
  const result = await User.findById(id);
  res
    .status(201)
    .json(new APIResponse(201, result, "Specific user details are Found."));
});
/* User End */

const google = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);
      const loggedInUser = await findById(user._id).select(
        "-password -refreshToken",
      );
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const user = new User.create({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken",
      );
      if (!createdUser) {
        throw new ApiError(
          500,
          "Google user not created.There must some credential error!",
        );
      }

      return res
        .status(201)
        .json(
          new APIResponse(
            200,
            createdUser,
            "Google user register successfully.",
          ),
        );
    }
  } catch (error) {
    throw new ApiError(error?.message || "Google user registration failed!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //this will removes the field from doc
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new APIResponse(200, {}, "User logged out"));
});

const docLogoutUser = asyncHandler(async (req, res) => {
  console.log("here I am");
  await Doctor.findByIdAndUpdate(
    req.body.data.user._id,
    {
      $unset: {
        refreshToken: 1, //this will removes the field from doc
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new APIResponse(200, {}, "Doc User logged out"));
});

const doctorSignUp = asyncHandler(async (req, res) => {
  const {
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
    password,
    time,
    gender,
    price,
    advPrice,
    slots: slotsString,
    onlineSlots: onlineSlotsString,
  } = req.body;

  let slots = [];
  let onlineSlots = [];

  try {
    if (slotsString) {
      slots = JSON.parse(slotsString);
    }
    if (onlineSlotsString) {
      onlineSlots = JSON.parse(onlineSlotsString);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new ApiError(400, "Invalid JSON format for slots or onlineSlots");
  }

  const existedUser = await Doctor.findOne({ email });
  if (existedUser) {
    throw new ApiError(402, "This email id is already used");
  }

  let avatarUrl = null;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
      });
      avatarUrl = result.secure_url;
    }

    const newDoctor = new Doctor({
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
      avatar: avatarUrl,
      password,
      time,
      gender,
      price,
      advPrice,
      slots,
      onlineSlots,
    });

    await newDoctor.save();

    const createdUser = await Doctor.findById(newDoctor._id).select(
      "-password -refreshToken",
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Doctor's ID not created. All fields must be filled!",
      );
    }

    return res
      .status(201)
      .json(
        new APIResponse(200, createdUser, "Doctor registered successfully."),
      );
  } catch (error) {
    console.error("Error during image upload:", error);
    throw new ApiError(500, "Image upload failed");
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
});

const seedDepartments = async () => {
  const departmentCount = await Department.countDocuments();
  if (departmentCount === 0) {
    const defaultDepartments = [
      { deptname: "CARDIOLOGY" },
      { deptname: "NEUROLOGY" },
      { deptname: "ORTHOPEDICS" },
      { deptname: "CHILDREN SPECIALIST" },
      { deptname: "DIABETES & ENDOCRINOLOGY" },
      { deptname: "ENT" },
      { deptname: "DENTISTRY" },
      { deptname: "DERMATOLOGY" },
      { deptname: "GENERAL SURGERY" },
      { deptname: "MEDICINE SPECIALIST" },
      { deptname: "NEUROSURGERY" },
    ];
    await Department.insertMany(defaultDepartments);
    console.log("Default departments added to the database");
  } else {
    console.log("Departments already exist in the database");
  }
};

const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({});
  res.status(200).json(departments);
});

const getDoctorsByDepartment = asyncHandler(async (req, res) => {
  const { deptname } = req.query;
  const doctors = await Doctor.find({ department: deptname }).select(
    "-password -refreshToken",
  );
  res.status(200).json(doctors);
});

const doctorSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "Email & Password required!");
  }

  const docUser = await Doctor.findOne({ email });
  if (!docUser) {
    throw new ApiError(401, "Doctor email not found!");
  }

  const validPassword = await docUser.isPasswordCorrect(password);
  if (!validPassword) {
    new ApiError(404, "User password won't matched!");
  }

  const { accessToken, refreshToken } = await generateDocAccessAndRefreshTokens(
    docUser._id,
  );

  const docLoggedIn = await Doctor.findById(docUser._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(
      new APIResponse(
        200,
        {
          user: docLoggedIn,
          accessToken,
          refreshToken,
        },
        "Doctor logged in successfully",
      ),
    );
});

const userUpdate = asyncHandler(async (req, res) => {
  // console.log("User Update", req.body);
  try {
    const { username, email, password, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username,
          email,
          password,
          avatar,
        },
      },
      { new: true },
    );

    return res
      .status(200)
      .json(
        new APIResponse(200, user, "Account details updated successfully."),
      );
  } catch (error) {
    console.log("Something went wrong in update section: ", error.message);
  }
});

const doctorUpdate = asyncHandler(async (req, res, next) => {
  console.log("Doctor id: ", req.body.id);
  const _id = req.body.id;
  try {
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
      address,
      time,
      gender,
      price,
      advPrice,
      slots,
      onlineSlots,
    } = req.body;

    let updateData = {
      _id,
      username,
      email,
      avatar,
      bmdc,
      specialty,
      qualification,
      designation,
      institute,
      department,
      phone,
      appointmentnumber,
      address,
      time,
      gender,
      price,
      advPrice,
      slots,
      onlineSlots,
    };

    // Only hash and update the password if it is provided
    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    let doctorUserUpdate = await Doctor.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true },
    );
    doctorUserUpdate = updateData;

    return res
      .status(200)
      .json(
        new APIResponse(
          200,
          doctorUserUpdate,
          "Doctor Details updated successfully",
        ),
      );
  } catch (error) {
    console.log(
      "Something went wrong in doctor update section: ",
      error.message,
    );
    return res
      .status(500)
      .json(
        new APIResponse(
          500,
          null,
          "Something went wrong in doctor update section",
        ),
      );
  }
});

const getAllDoctors = asyncHandler(async (req, res, next) => {
  const query = {};
  const result = await Doctor.find(query);
  res
    .status(201)
    .json(new APIResponse(201, result, "All the doctors a shown."));
});

const getSpecificDoctor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Doctor Id is required");
  }
  const result = await Doctor.findById(id);
  res
    .status(201)
    .json(new APIResponse(201, result, "Specific doctor details are Found."));
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const query = {};
  const result = await User.find(query);
  res.status(201).json(new APIResponse(201, result, "All Users provided."));
});

const userDelete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("delete: ", req.params);

  if (!id) {
    throw new ApiError(400, "Admin or System Admin Id is required");
  }

  if (req.user.role !== "system-admin" && req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to delete this admin",
    );
  }

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new ApiError(404, "Deleted User is not found");
  }

  res.status(200).json({
    success: true,
    message: "User Delete deleted successfully",
    data: deletedUser,
  });
});

const doctorDelete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("delete: ", req.params);

  if (!id) {
    throw new ApiError(400, "Admin or System Admin Id is required");
  }

  if (req.user.role !== "system-admin" && req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to delete this admin",
    );
  }

  const deletedDoctor = await Doctor.findByIdAndDelete(id);

  if (!deletedDoctor) {
    throw new ApiError(404, "Deleted User is not found");
  }

  res.status(200).json({
    success: true,
    message: "User Delete deleted successfully",
    data: deletedDoctor,
  });
});

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
  userDelete,
  doctorDelete,
  getDoctorsByDepartment,
  getDepartments,
  seedDepartments,
  specificUser,
};
