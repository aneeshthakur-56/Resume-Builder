import { Router } from "express";

import {
  loginValidation,
  registerValidation,
} from "../validators/user.validator.js";

import { validate } from "../middleware/validate.middleware.js";

import { authUser } from "../middleware/auth.middleware.js";

import {
  getUserById,
  loginUser,
  logout,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

// Register
router.post("/register", registerValidation, validate, registerUser);

// Login
router.post("/login", loginValidation, validate, loginUser);

// Protected Route
router.get("/data", authUser, getUserById);

router.get("/logout", authUser, logout);

router.put("/update", authUser, updateUser);

export { router as userRouter };
