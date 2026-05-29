import { Router } from "express";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  getUserResumes,
  updateResume,
} from "../controllers/resume.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const resumeRouter = Router();

resumeRouter.get("/", authUser, getUserResumes);
resumeRouter.post("/create", authUser, createResume);
resumeRouter.put("/update", upload.single("image"), authUser, updateResume);
resumeRouter.delete("/delete/:resumeId", authUser, deleteResume);
resumeRouter.get("/get/:resumeId", authUser, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);
export default resumeRouter;
