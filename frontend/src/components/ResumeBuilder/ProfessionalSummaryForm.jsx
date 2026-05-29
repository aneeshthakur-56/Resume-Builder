import { useState } from "react";
import { Sparkles } from "lucide-react";
import { makeApiRequest } from "../../utils/apiService";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    if (!data || !data.trim()) {
      toast.error("Please enter a short draft of your summary first!");
      return;
    }
    setIsEnhancing(true);
    try {
      const response = await makeApiRequest("/api/ai/enhance-pro-sum", "POST", {
        userContent: data,
      });
      if (response && response.success) {
        onChange(response.data);
        toast.success("Professional Summary enhanced successfully!");
      }
    } catch (error) {
      console.error("AI enhancement failed:", error);
      toast.error(error.message || "AI enhancement failed");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your professional experience
          </p>
        </div>

        <button
          onClick={handleEnhance}
          disabled={isEnhancing}
          className="flex items-center gap-2 text-sm text-green-600 bg-gradient-to-r from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 focus:outline-none transition-all px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={16} className={isEnhancing ? "animate-spin" : ""} />
          <span className="max-sm:hidden">{isEnhancing ? "Enhancing..." : "AI Enhance"}</span>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        className="w-full p-3 px-4 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-all resize-none"
        placeholder="Enter your professional summary..."
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
      />

      {/* Tip */}
      <p className="text-xs text-gray-500 text-center">
        Tip: Keep it concise and highlight your key skills and achievements
      </p>
    </div>
  );
};

export default ProfessionalSummaryForm;
