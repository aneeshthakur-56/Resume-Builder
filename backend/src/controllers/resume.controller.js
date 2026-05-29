import Resume from "../models/Resume.model.js";
import apiHandler from "../utils/apiHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import imageKit from "../config/imageKit.js";
import fs from "fs";
export const getUserResumes = apiHandler(async (req, res) => {
  const { id } = req.user;

  const resumes = await Resume.find({ userId: id });

  return res
    .status(200)
    .json(new ApiResponse(200, "Resumes Fetched Successfully", resumes));
});

export const createResume = apiHandler(async (req, res) => {
  const { id } = req.user;
  const { title } = req.body;

  const resume = await Resume.create({
    userId: id,
    title,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Resume Created Successfully", resume));
});

export const deleteResume = apiHandler(async (req, res) => {
  const { id } = req.user;
  const { resumeId } = req.params;

  console.log("DELETE REQUEST RECEIVED:", { userId: id, resumeId });

  const deleted = await Resume.findOneAndDelete({ userId: id, _id: resumeId });

  console.log("DELETED RESULT:", deleted);

  if (!deleted) throw new ApiError(404, "Resume not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Resume Deleted Successfully"));
});

export const getResumeById = apiHandler(async (req, res) => {
  const { id } = req.user;
  const { resumeId } = req.params;

  const resume = await Resume.findOne({ userId: id, _id: resumeId }).select(
    "-__v -createdAt -updatedAt",
  );

  if (!resume) throw new ApiError(404, "Resume not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Resume Fetched Successfully", resume));
});

export const getPublicResumeById = apiHandler(async (req, res) => {
  const { resumeId } = req.params;

  const resume = await Resume.findOne({ public: true, _id: resumeId }).select(
    "-__v -createdAt -updatedAt",
  );

  if (!resume) throw new ApiError(404, "Resume not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Resume Fetched Successfully", resume));
});

export const updateResume = apiHandler(async (req, res) => {
  const { id } = req.user;
  const { resumeId, resumeData } = req.body;
  const image = req.file;

  let resumeDataCopy =
    typeof resumeData === "string" ? JSON.parse(resumeData) : resumeData;

  const removeBackground =
    req.body.removeBackground === "true" ||
    (resumeDataCopy &&
      resumeDataCopy.personal_info &&
      (resumeDataCopy.personal_info.removeBackground === true ||
        resumeDataCopy.personal_info.removeBackground === "true"));

  if (image) {
    const imageBufferData = fs.createReadStream(image.path);
    const response = await imageKit.files.upload({
      file: imageBufferData,
      fileName: "resume.png",
      folder: "user-resumes",
      transformation: {
        pre: "w-300,h-300,fo-face,z-0.75",
      },
    });

    // Append real-time background removal query parameter if enabled.
    // This is the standard, high-reliability way to perform real-time AI background removal
    // in ImageKit without causing upload failures or requiring pre-registration.
    resumeDataCopy.personal_info.image =
      response.url + (removeBackground ? "?tr=e-bgremove" : "");
  } else if (
    resumeDataCopy.personal_info?.image &&
    typeof resumeDataCopy.personal_info.image === "string"
  ) {
    // Handle background removal toggle on existing image (without new file upload)
    const currentImageUrl = resumeDataCopy.personal_info.image;
    const hasRemovalParam = currentImageUrl.includes("tr=e-bgremove");

    if (removeBackground && !hasRemovalParam) {
      // Add background removal
      resumeDataCopy.personal_info.image = currentImageUrl.includes("?")
        ? `${currentImageUrl}&tr=e-bgremove`
        : `${currentImageUrl}?tr=e-bgremove`;
    } else if (!removeBackground && hasRemovalParam) {
      // Remove background removal
      resumeDataCopy.personal_info.image = currentImageUrl
        .replace("?tr=e-bgremove", "")
        .replace("&tr=e-bgremove", "");
    }
  }

  const resume = await Resume.findOneAndUpdate(
    { _id: resumeId, userId: id },
    resumeDataCopy,
    { new: true },
  ).select("-__v -createdAt -updatedAt");

  if (!resume) throw new ApiError(404, "Resume not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Resume Updated Successfully", resume));
});
