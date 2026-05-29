import { Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

const SkillForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    onChange(data.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your technical and soft skills relevant to the role.
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React.js, Node.js, Communication"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleAddSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Skills List */}
      {data.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {data.map((skill) => (
            <li
              key={skill}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {skill}

              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-xl py-8 text-center">
          <Sparkles className="w-10 h-10 mx-auto mb-3 text-gray-300" />

          <p className="text-gray-600 font-medium">No skills added yet</p>

          <p className="text-sm text-gray-500 mt-1">
            Add your skills to make your resume stronger.
          </p>
        </div>
      )}

      {/* Tip */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Tip:</strong> Add 8–12 relevant skills including both
          technical and soft skills to improve your resume visibility.
        </p>
      </div>
    </div>
  );
};

export default SkillForm;
