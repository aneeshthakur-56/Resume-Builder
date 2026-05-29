import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Yellow", value: "#f59e0b" },
    { name: "Pink", value: "#ec4899" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Gray", value: "#6b7280" },
    { name: "Orange", value: "#f97316" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Lime", value: "#84cc16" },
    { name: "Black", value: "#1F2937" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Button */}
      <button
        type="button"
        className="flex items-center gap-2 text-sm text-green-600 bg-gradient-to-r from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 focus:outline-none transition-all px-3 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette size={16} />

        <span className="max-sm:hidden">Accent Color</span>
      </button>

      {/* Color Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 grid grid-cols-4 gap-3 z-10 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              {/* Color Circle */}
              <div
                className="relative w-12 h-12 rounded-full border-2 border-transparent group-hover:border-green-500 transition-colors flex items-center justify-center"
                style={{
                  backgroundColor: color.value,
                }}
              >
                {/* Selected Check */}
                {selectedColor === color.value && (
                  <Check className="text-white size-5" />
                )}
              </div>

              {/* Color Name */}
              <p className="text-xs text-center mt-2 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
