import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data = [], onChange }) => {
  function addEducation() {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...(data || []), newEducation]);
  }

  function removeEducation(index) {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  }

  function updateEducation(index, field, value) {
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
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add details about your educational background
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 text-sm text-green-600 bg-gradient-to-r from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 focus:outline-none transition-all px-3 py-2 rounded-lg"
        >
          <Plus size={16} />
          <span className="max-sm:hidden">Add Education</span>
        </button>
      </div>

      {/* Education List */}
      {data.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          <GraduationCap className="text-gray-300 w-12 h-12 mx-auto mb-3" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold text-gray-900">
                  Education {index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Institution Name"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Degree (e.g. Bachelor's, Master's)"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="month"
                  value={edu.graduation_date}
                  placeholder="Graduation Date"
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
                <input
                  type="text"
                  placeholder="GPA (optional)"
                  value={edu.gpa}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
