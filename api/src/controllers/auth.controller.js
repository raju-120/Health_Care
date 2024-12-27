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






/* User SignUp */
const signup = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if username or email already exists
  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(401, "Email already exists!");
  }

  // Create user
  const user = new User({
    username,
    email,
    password,
    role,
  });

  await user.save();

  const createdUser = await User.findById(user._id)

  if (!createdUser) {
    throw new ApiError(
      500,
      "User not created. There must be some credential error!"
    );
  }

  return res
    .status(201)
    .json(
      new APIResponse(200, createdUser, "User registered successfully.")
    );
});

// User Sign In
const signin = asyncHandler(async (req, res) => {
  console.log("Sign in", req.body);
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required!");
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password!");
  }

  // Verify the password
  const validPassword = await user.isPasswordCorrect(password);
  if (!validPassword) {
    throw new ApiError(401, "Invalid email or password!");
  }

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Update user's refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  // Return user data and tokens
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .json(
      new APIResponse(
        200,
        {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          },
          accessToken,
          refreshToken,
        },
        "User logged in successfully."
      )
    );
});

// Specific User
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


// User Update
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


// Get All Users
const getAllUsers = asyncHandler(async (req, res, next) => {
  const query = {};
  const result = await User.find(query);
  res.status(201).json(new APIResponse(201, result, "All Users provided."));
});


// User Delete
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


// User Logout
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



// Doctor Sign up
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
  let avatarUrl = null;

  // Parse JSON strings for slots and onlineSlots
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

  // Check if the email already exists
  const existedUser = await Doctor.findOne({ email });
  if (existedUser) {
    throw new ApiError(402, "This email ID is already used");
  }

  try {
    // Handle file upload with Cloudinary
    if (req.file) {
      console.log("File received:", req.file);
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "avatars",
        });
        avatarUrl = result.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new ApiError(500, "Failed to upload image to Cloudinary");
      }
    }

    // Create a new doctor
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

    // Find created doctor and exclude sensitive fields
    const createdUser = await Doctor.findById(newDoctor._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Doctor's ID not created. All fields must be filled!"
      );
    }

    // Success response
    return res
      .status(201)
      .json(
        new APIResponse(200, createdUser, "Doctor registered successfully.")
      );
  } catch (error) {
    console.error("Error during doctor signup:", error);
    throw new ApiError(500, error.message || "Image upload failed");
  } finally {
    // Cleanup the file
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
        console.log("Temporary file deleted:", req.file.path);
      } catch (error) {
        console.error("Error deleting temporary file:", error);
      }
    }
  }
});

// Doctor Sign In
const doctorSignIn = asyncHandler(async (req, res) => {
  console.log("Sign in", req.body);
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required!");
  }

  // Check if the user exists
  const user = await Doctor.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password!");
  }

  // Verify the password
  const validPassword = await user.isPasswordCorrect(password);
  if (!validPassword) {
    throw new ApiError(401, "Invalid email or password!");
  }

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Update user's refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  // Exclude sensitive fields like password from the response
  const doctorDetails = await Doctor.findById(user._id).select("-password -refreshToken");

  // Return response with detailed user information
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .json(
      new APIResponse(
        200,
        {
          user: doctorDetails,
          accessToken,
          refreshToken,
        },
        "Doctor logged in successfully."
      )
    );
});


// Doctor Update
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

// Get All Doctors
const getAllDoctors = asyncHandler(async (req, res, next) => {
  const query = {};
  const result = await Doctor.find(query);
  res
    .status(201)
    .json(new APIResponse(201, result, "All the doctors a shown."));
});

// Get Specific Doctor
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

// Doctor Delete
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

// Get Departments
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({});
  res.status(200).json(departments);
});


// Get Doctors by Department
const getDoctorsByDepartment = asyncHandler(async (req, res) => {
  const { deptname } = req.query;
  const doctors = await Doctor.find({ department: deptname }).select(
    "-password -refreshToken",
  );
  res.status(200).json(doctors);
});


// Doctor Logout
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
