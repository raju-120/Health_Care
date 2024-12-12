import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,

      unique: true,
    },
    email: {
      type: String,

      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1ONQXqXvCpLId6n-qBr_hq&ust=1709634587589000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPj47KOz2oQDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Hash the password and set it directly
    this.password = bcrypt.hash(this.password, 10);
    next(); // Call next() after successful password hashing
  } catch (err) {
    next(err); // Pass any error to next() for error handling
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userSchema);
