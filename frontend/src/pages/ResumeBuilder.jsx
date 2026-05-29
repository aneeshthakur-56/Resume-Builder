import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeApiRequest, triggerDirectDownload } from "../utils/apiService";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import PersonalInfoForm from "../components/ResumeBuilder/PersonalInfoForm";
import ColorPicker from "../components/ResumeBuilder/ColorPicker";
import ResumePreview from "../components/ResumeBuilder/ResumePreview";
import TemplateSelector from "../components/ResumeBuilder/TemplateSelector";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import ProfessionalSummaryForm from "../components/ResumeBuilder/ProfessionalSummaryForm";
import ExperienceForm from "../components/ResumeBuilder/ExperienceForm";
import EducationForm from "../components/ResumeBuilder/EducationForm";
import ProjectForm from "../components/ResumeBuilder/ProjectForm";
import SkillForm from "../components/ResumeBuilder/SkillForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    userId: "",
    title: "",
    public: false,

    personal_info: {},

    professional_summary: "",

    skills: [],
    experience: [],
    education: [],
    project: [],

    template: "classic",
    accent_color: "#3b82f6",
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];
  const ActiveSectionIcon = activeSection.icon;

  useEffect(() => {
    async function loadExistingResume() {
      if (!resumeId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await makeApiRequest(
          `/api/resumes/get/${resumeId}`,
          "GET",
        );
        if (response && response.success) {
          const data = response.data;
          setResumeData({
            ...data,
            personal_info: {
              ...(data.personal_info || {}),
              removeBackground: data.personal_info?.removeBackground || false,
            },
            skills: data.skills || [],
            experience: data.experience || [],
            education: data.education || [],
            project: data.project || [],
          });
          document.title = `${data.title || "Resume"} - Resume Builder`;
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        toast.error("Failed to load resume details");
      } finally {
        setLoading(false);
      }
    }

    loadExistingResume();
  }, [resumeId]);

  const changeResumeVisibility = async () => {
    const updatedPublic = !resumeData.public;
    setResumeData((prev) => ({ ...prev, public: updatedPublic }));
    try {
      const response = await makeApiRequest("/api/resumes/update", "PUT", {
        resumeId,
        resumeData: { public: updatedPublic },
      });
      if (response && response.success) {
        toast.success(
          updatedPublic ? "Resume is now public" : "Resume is now private",
        );
      }
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast.error("Failed to update visibility");
      setResumeData((prev) => ({ ...prev, public: !updatedPublic }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const hasImageFile = resumeData.personal_info?.image instanceof File;
      const isBgRemoveActive = !!resumeData.personal_info?.removeBackground;
      let response;
      if (hasImageFile) {
        const formData = new FormData();
        formData.append("resumeId", resumeId);
        formData.append(
          "removeBackground",
          isBgRemoveActive ? "true" : "false",
        );
        formData.append("image", resumeData.personal_info.image);

        const cleanResumeData = {
          ...resumeData,
          personal_info: {
            ...resumeData.personal_info,
            image: "",
          },
        };
        formData.append("resumeData", JSON.stringify(cleanResumeData));

        response = await makeApiRequest("/api/resumes/update", "PUT", formData);
      } else {
        // Always include removeBackground flag even when not uploading new image
        response = await makeApiRequest("/api/resumes/update", "PUT", {
          resumeId,
          removeBackground: isBgRemoveActive ? "true" : "false",
          resumeData,
        });
      }

      if (response && response.success) {
        toast.success(response.message || "Resume saved successfully!");
        if (response.data) {
          setResumeData(response.data);
        }
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error(error.message || "Failed to save resume changes");
    } finally {
      setIsSaving(false);
    }
  };

  function handleShare() {
    const frontendUrl = window.location.href.split("/app")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeData._id}`;
    if (navigator.share) {
      navigator.share({
        title: resumeData.title,
        url: resumeUrl,
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  }

  function handleDownload() {
    triggerDirectDownload(resumeId);
  }

  if (loading) {
    return <Loader message="Loading your resume..." />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon size={20} />
          Back to Dashboard
        </Link>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="relative lg:col-span-5 overflow-hidden rounded-xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 pt-2 relative">
              {/* Progress Background */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200" />

              {/* Progress Bar */}
              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* Navigation Header */}
              <div className="mb-6">
                {/* Top row: customization tools + step counter + nav arrows */}
                <div className="flex items-center justify-between py-3 mb-3">
                  <div className="flex items-center gap-2">
                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onSelectTemplate={(template) =>
                        setResumeData((prev) => ({ ...prev, template }))
                      }
                    />
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(color) =>
                        setResumeData((prev) => ({
                          ...prev,
                          accent_color: color,
                        }))
                      }
                    />
                  </div>

                  {/* Step counter + nav arrows */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-400 mr-2 tabular-nums">
                      {activeSectionIndex + 1} / {sections.length}
                    </span>
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={activeSectionIndex === 0}
                      className="flex items-center justify-center w-7 h-7 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.min(prev + 1, sections.length - 1),
                        )
                      }
                      disabled={activeSectionIndex === sections.length - 1}
                      className="flex items-center justify-center w-7 h-7 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Segmented section tabs */}
                <div className="grid grid-cols-6 gap-1 bg-gray-100 rounded-xl p-1">
                  {sections.map((section, index) => {
                    const SectionIcon = section.icon;
                    const isActive = index === activeSectionIndex;
                    const isCompleted = index < activeSectionIndex;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSectionIndex(index)}
                        title={section.name}
                        className={`relative flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-white text-blue-600 shadow-sm"
                            : isCompleted
                              ? "text-green-600 hover:bg-white/60"
                              : "text-gray-400 hover:text-gray-600 hover:bg-white/60"
                        }`}
                      >
                        <span className="relative">
                          <SectionIcon className="size-4" />
                          {isCompleted && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                          )}
                        </span>
                        <span className="hidden sm:block leading-none truncate w-full text-center">
                          {section.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active section label */}
                <div className="flex items-center gap-2 mt-3 px-1">
                  <ActiveSectionIcon className="size-4 text-blue-500" />
                  <h2 className="text-sm font-semibold text-gray-700">
                    {activeSection.name}
                  </h2>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
              </div>

              {/* Form Sections */}
              <div className="space-y-6">
                {/* Personal Info */}
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    accentColor={resumeData.accent_color}
                  />
                )}

                {/* Summary */}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(value) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: value,
                      }))
                    }
                  />
                )}

                {/* Experience */}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(value) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: value,
                      }))
                    }
                  />
                )}

                {/* Education */}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(value) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: value,
                      }))
                    }
                  />
                )}

                {/* Projects */}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(value) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: value,
                      }))
                    }
                  />
                )}

                {/* Skills */}
                {activeSection.id === "skills" && (
                  <SkillForm
                    data={resumeData.skills}
                    onChange={(value) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: value,
                      }))
                    }
                  />
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-br from-green-100 to-green-200 ring-gray-300 text-green-600 ring hover:ring-green-400 px-6 py-2 rounded-md mt-6
                text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute  bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && user?.email !== "demo@example.com" && (
                  <button
                    onClick={handleShare}
                    className="flex gap-2 items-center p-2 px-4 py-2 text-sm bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-600 hover:ring  transition-colors"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}
                {user?.email !== "demo@example.com" && (
                  <button
                    onClick={changeResumeVisibility}
                    className="flex gap-2 items-center p-2 px-4 py-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-600 hover:ring  transition-colors"
                  >
                    {resumeData.public ? (
                      <EyeIcon className="size-4 " />
                    ) : (
                      <EyeOffIcon className="size-4 " />
                    )}
                    {resumeData.public ? "Make Private" : "Make Public"}
                  </button>
                )}
                {user?.email !== "demo@example.com" && (
                  <button
                    onClick={handleDownload}
                    className="flex gap-2 items-center p-2 px-4 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-600 hover:ring  transition-colors"
                  >
                    <Download className="size-4 " />
                    Download
                  </button>
                )}
              </div>
            </div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
