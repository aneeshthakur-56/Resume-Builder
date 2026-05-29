import jwt from "jsonwebtoken";

import User from "../models/User.model.js";
import apiHandler from "../utils/apiHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Generate JWT Token
const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

// Register User
const registerUser = apiHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check existing user
  const existing = await User.findOne({ email });

  if (existing) {
    throw new ApiError(400, "User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate token
  const token = generateToken(user);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json(
    new ApiResponse(201, "Registration Successful", {
      _id: user._id,
      name: user.name,
      email: user.email,
    }),
  );
});

const loginUser = apiHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid Email or Password");
  }

  // Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid Email or Password");
  }

  // Generate token
  const token = generateToken(user);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  user.password = undefined;
  return res.status(200).json(new ApiResponse(200, "Login Successful", user));
});

const getUserById = apiHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  user.password = undefined;
  return res.status(200).json(new ApiResponse(200, "User found", user));
});

const logout  = apiHandler(async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, "Logout Successful"));
})

const updateUser = apiHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, email, currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (name) user.name = name;

  if (email && email !== user.email) {
    const existing = await User.findOne({ email });
    if (existing) throw new ApiError(400, "Email is already taken");
    user.email = email;
  }

  if (currentPassword && newPassword) {
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new ApiError(400, "Incorrect current password");
    user.password = newPassword;
  }

  await user.save();
  user.password = undefined;

  return res.status(200).json(new ApiResponse(200, "Profile updated successfully", user));
});

export { registerUser, loginUser, getUserById, logout, updateUser };
