import { Check, Layout } from "lucide-react";
import { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "modern",
      name: "Modern",
      preview: "A modern template with a clean layout and bold headings.",
    },
    {
      id: "classic",
      name: "Classic",
      preview:
        "A timeless design with a traditional layout and elegant typography.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "A sleek template with a minimalist design and ample white space.",
    },
    {
      id: "minimal-image",
      name: "Minimal + Image",
      preview:
        "A minimalist design that incorporates a profile image for a personal touch.",
    },
  ];

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm text-green-600 bg-gradient-to-r from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 focus:outline-none transition-all px-3 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Layout size={14} />

        <span className="max-sm:hidden">Templates</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 space-y-3 z-10 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative p-3 border rounded-xl cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "bg-green-50 border-green-400"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => {
                onSelectTemplate(template.id);
                setIsOpen(false);
              }}
            >
              {/* Selected Icon */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Template Content */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">{template.name}</h4>

                <p className="p-2 bg-blue-50 rounded text-xs text-gray-500 italic leading-relaxed">
                  {template.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
