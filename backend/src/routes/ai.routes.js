import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume, enhanceProjectDescription } from "../controllers/ai.controller.js";
const aiRouter = Router();

aiRouter.post("/enhance-pro-sum", authUser, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", authUser, enhanceJobDescription);
aiRouter.post("/enhance-project-desc", authUser, enhanceProjectDescription);
aiRouter.post("/upload-resume", authUser, uploadResume);

export default aiRouter;
