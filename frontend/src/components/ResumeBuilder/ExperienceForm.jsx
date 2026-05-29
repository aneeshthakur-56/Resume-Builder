import { useState } from "react";
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import { makeApiRequest } from "../../utils/apiService";
import toast from "react-hot-toast";

const ExperienceForm = ({ data = [], onChange }) => {
  const [enhancingIndices, setEnhancingIndices] = useState({});

  const handleEnhance = async (index) => {
    const exp = data[index];
    const desc = exp?.description || "";
    if (!desc.trim()) {
      toast.error("Please enter a short draft of the job description first!");
      return;
    }
    
    setEnhancingIndices((prev) => ({ ...prev, [index]: true }));
    try {
      const response = await makeApiRequest("/api/ai/enhance-job-desc", "POST", {
        userContent: desc,
      });
      if (response && response.success) {
        updateExperience(index, "description", response.data);
        toast.success("Job description enhanced successfully!");
      }
    } catch (error) {
      console.error("AI description enhancement failed:", error);
      toast.error(error.message || "AI enhancement failed");
    } finally {
      setEnhancingIndices((prev) => ({ ...prev, [index]: false }));
    }
  };

  function addExperience() {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      isCurrent: false,
    };
    onChange([...(data || []), newExperience]);
  }
  function removeExperience(index) {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  }
  function updateExperience(index, field, value) {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add details for your professional experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 text-sm text-green-600 bg-gradient-to-r from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 focus:outline-none transition-all px-3 py-2 rounded-lg"
        >
          <Plus size={16} />
          <span className="max-sm:hidden">Add Experience</span>
        </button>
      </div>

      {/* Experience List */}
      {data.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          <Briefcase className="text-gray-300 w-12 h-12 mx-auto mb-3" />
          <p>No experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              {/* Remove Button */}
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold text-gray-900">
                  Experience {index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Job Title / Position"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="month"
                  value={exp.start_date}
                  placeholder="Start Date"
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="month"
                  value={exp.end_date}
                  placeholder="End Date"
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  disabled={exp.isCurrent}
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg disabled:bg-gray-100"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.isCurrent || false}
                  onChange={(e) =>
                    updateExperience(index, "isCurrent", e.target.checked)
                  }
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    type="button"
                    onClick={() => handleEnhance(index)}
                    disabled={enhancingIndices[index]}
                    className="flex items-center gap-1.5 text-sm text-purple-600 bg-gradient-to-r from-purple-50 to-purple-100 ring-1 ring-purple-300 hover:ring-purple-400 hover:text-purple-700 focus:outline-none transition-all px-3 py-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className={`w-3 h-3 ${enhancingIndices[index] ? "animate-spin" : ""}`} />
                    {enhancingIndices[index] ? "Enhancing..." : "Enhance with AI"}
                  </button>
                </div>
                <textarea
                  placeholder="Describe your responsibilities, achievements, and skills used in this role."
                  value={exp.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
