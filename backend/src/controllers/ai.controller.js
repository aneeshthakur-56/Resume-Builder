import ai from "../config/ai.js";
import Resume from "../models/Resume.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import apiHandler from "../utils/apiHandler.js";

export const enhanceProfessionalSummary = apiHandler(async (req, res) => {
  const { userContent } = req.body;

  if (!userContent) {
    throw new ApiError(400, "Missing Required Fields");
  }

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: userContent,
    config: {
      systemInstruction: `
        You are an expert resume writer.

        Your task is to enhance the professional summary of a resume.
        The summary should:
        - Be 1-2 sentences long
        - Highlight key skills and experience
        - Mention career objectives when appropriate
        - Be compelling and ATS-friendly
        - Return only the enhanced summary text
        - Do not include explanations, bullet points, or additional formatting
      `,
    }
  });

  if (!response.text) {
    throw new ApiError(502, "AI returned an empty response");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Summary Enhanced Successfully", response.text));
});

export const enhanceJobDescription = apiHandler(async (req, res) => {
  const { userContent } = req.body;

  if (!userContent) {
    throw new ApiError(400, "Missing Required Fields");
  }

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: userContent,
    config: {
      systemInstruction: `
        You are an expert in resume writing.

        Your task is to enhance the job description of a resume.

        Rules:
        - Keep it to 1-2 sentences.
        - Highlight key responsibilities and achievements.
        - Use strong action verbs.
        - Include quantifiable results where possible.
        - Make it ATS-friendly.
        - Return only the enhanced text.
        - Do not provide explanations, suggestions, bullet points, or additional formatting.
      `,
    }
  });

  if (!response.text) {
    throw new ApiError(502, "AI returned an empty response");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Job Description Enhanced Successfully",
        response.text,
      ),
    );
});

export const enhanceProjectDescription = apiHandler(async (req, res) => {
  const { userContent } = req.body;

  if (!userContent) {
    throw new ApiError(400, "Missing Required Fields");
  }

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: userContent,
    config: {
      systemInstruction: `
        You are an expert in resume writing.

        Your task is to enhance a project description in a resume.

        Rules:
        - Keep it to 1-2 sentences.
        - Highlight what was built, the technologies used, and the impact or key features.
        - Use strong action verbs and tech-centric language.
        - Make it ATS-friendly.
        - Return only the enhanced description text.
        - Do not provide explanations, suggestions, bullet points, or additional formatting.
      `,
    }
  });

  if (!response.text) {
    throw new ApiError(502, "AI returned an empty response");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Project Description Enhanced Successfully",
        response.text,
      ),
    );
});

export const uploadResume = apiHandler(async (req, res) => {
  const { resumeText, title } = req.body;
  const { id } = req.user;

  if (!resumeText) {
    throw new ApiError(400, "Resume text is required");
  }

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: resumeText,
    config: {
      responseMimeType: "application/json",
      systemInstruction: `
You are an expert resume parsing AI.

Extract all information from the resume and return ONLY valid JSON.

The JSON MUST strictly follow this schema:

{
  "professional_summary": "string",

  "skills": [
    "JavaScript",
    "React",
    "Node.js"
  ],

  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },

  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "isCurrent": false
    }
  ],

  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],

  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}

Extraction Rules:

1. personal_info.full_name — Extract candidate's full name.
2. personal_info.profession — Extract current profession. Examples: "Frontend Developer", "Software Engineer".
3. personal_info.email — Extract email address.
4. personal_info.phone — Extract phone number.
5. personal_info.location — Extract city/state/country.
6. personal_info.linkedin — Extract LinkedIn URL.
7. personal_info.website — Extract Portfolio/GitHub/Website URL.
8. professional_summary — Extract resume summary/objective. If missing, generate a concise ATS-friendly summary from experience.
9. skills — Return as array of strings. Remove duplicates.
10. experience — Extract every work experience. isCurrent=true if role is ongoing.
11. project — name, type (Web Application, Mobile App, API, etc.), description.
12. education — institution, degree, field, graduation_date, gpa if available.
13. If a value is unavailable: use "" for strings, [] for arrays, false for booleans.
14. Return ONLY JSON. Never return markdown, explanations, or comments.
      `,
    }
  });

  if (!response.text) {
    throw new ApiError(502, "AI returned an empty response");
  }

  let extractedData;

  try {
    extractedData = JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Response:", response.text);
    throw new ApiError(500, "Failed to parse resume data returned by AI");
  }

  const resume = await Resume.create({
    userId: id,
    title: title || "Untitled Resume",
    professional_summary: extractedData.professional_summary || extractedData.summary || "",
    skills: Array.isArray(extractedData.skills) 
      ? extractedData.skills 
      : (Array.isArray(extractedData.skill) ? extractedData.skill : []),
    personal_info: {
      image: extractedData.personal_info?.image || "",
      full_name: extractedData.personal_info?.full_name || extractedData.personal_info?.name || "",
      profession: extractedData.personal_info?.profession || extractedData.personal_info?.title || "",
      email: extractedData.personal_info?.email || "",
      phone: extractedData.personal_info?.phone || "",
      location: extractedData.personal_info?.location || "",
      linkedin: extractedData.personal_info?.linkedin || "",
      website: extractedData.personal_info?.website || extractedData.personal_info?.github || "",
    },
    experience: Array.isArray(extractedData.experience)
      ? extractedData.experience
      : (Array.isArray(extractedData.experiences) ? extractedData.experiences : []),
    project: Array.isArray(extractedData.project)
      ? extractedData.project
      : (Array.isArray(extractedData.projects) ? extractedData.projects : []),
    education: Array.isArray(extractedData.education)
      ? extractedData.education
      : (Array.isArray(extractedData.educations) ? extractedData.educations : []),
  });

  return res.status(201).json(
    new ApiResponse(201, "Resume Uploaded Successfully", {
      resumeId: resume._id,
      data: resume,
    }),
  );
});
