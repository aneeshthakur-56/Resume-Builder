import { useState } from "react";
import { FolderIcon, Plus, Sparkles, Trash2 } from "lucide-react";
import { makeApiRequest } from "../../utils/apiService";
import toast from "react-hot-toast";

const ProjectForm = ({ data = [], onChange }) => {
  const [enhancingIndices, setEnhancingIndices] = useState({});

  const handleEnhance = async (index) => {
    const proj = data[index];
    const desc = proj?.description || "";
    if (!desc.trim()) {
      toast.error("Please enter a short draft of the project description first!");
      return;
    }
    
    setEnhancingIndices((prev) => ({ ...prev, [index]: true }));
    try {
      const response = await makeApiRequest("/api/ai/enhance-project-desc", "POST", {
        userContent: desc,
      });
      if (response && response.success) {
        updateProject(index, "description", response.data);
        toast.success("Project description enhanced successfully!");
      }
    } catch (error) {
      console.error("AI project enhancement failed:", error);
      toast.error(error.message || "AI enhancement failed");
    } finally {
      setEnhancingIndices((prev) => ({ ...prev, [index]: false }));
    }
  };

  function addProject() {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...(data || []), newProject]);
  }

  function removeProject(index) {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  }

  function updateProject(index, field, value) {
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
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Add details about your projects
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 text-sm text-green-600 bg-gradient-to-r from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 focus:outline-none transition-all px-3 py-2 rounded-lg"
        >
          <Plus size={16} />
          <span className="max-sm:hidden">Add Project</span>
        </button>
      </div>

      {/* Project List */}
      {data.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          <FolderIcon className="text-gray-300 w-12 h-12 mx-auto mb-3" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold text-gray-900">
                  Project {index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Project Type"
                  value={project.type}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Project Description
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
                  placeholder="Describe what you built, key features implemented, technologies used, and the impact or results achieved in this project."
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
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

export default ProjectForm;
