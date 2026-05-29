import {
  Briefcase,
  Mail,
  MapPin,
  Phone,
  User,
  Linkedin,
  Globe,
} from "lucide-react";

const PersonalInfoForm = ({
  data = {},
  onChange,
  accentColor = "#3b82f6",
}) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const isBgRemoveActive = typeof data.image === "string"
    ? data.image.includes("tr=e-bgremove")
    : !!data.removeBackground;

  const handleToggleBgRemove = () => {
    const nextVal = !isBgRemoveActive;
    let newImageUrl = data.image;
    
    if (typeof data.image === "string") {
      if (nextVal) {
        if (!data.image.includes("tr=e-bgremove")) {
          newImageUrl = data.image.includes("?")
            ? `${data.image}&tr=e-bgremove`
            : `${data.image}?tr=e-bgremove`;
        }
      } else {
        newImageUrl = data.image
          .replace("?tr=e-bgremove", "")
          .replace("&tr=e-bgremove", "");
      }
    }

    onChange({
      ...data,
      removeBackground: nextVal,
      image: newImageUrl,
    });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name ",
      icon: User,
      type: "text",
      placeholder: "John Doe",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      placeholder: "john.doe@example.com",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
      placeholder: "(123) 456-7890",
      required: false,
    },

    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      placeholder: "City, State",
      required: false,
    },
    {
      key: "profession",
      label: "Profession",
      icon: Briefcase,
      type: "text",
      placeholder: "Software Engineer",
      required: false,
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
      placeholder: "https://linkedin.com/in/johndoe",
      required: false,
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
      placeholder: "https://johndoe.com",
      required: false,
    },
  ];

  return (
    <div>
      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>

      <p className="text-sm text-gray-600">
        Get started with your personal information.
      </p>

      {/* Image Upload */}
      <div className="flex items-center gap-4 mt-5">
        <label>
          {data?.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80 cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: isBgRemoveActive ? accentColor : "transparent",
              }}
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700 cursor-pointer">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload User Image
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Remove Background Toggle */}
        {data?.image && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p>Remove Background</p>

            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isBgRemoveActive}
                onChange={handleToggleBgRemove}
              />

              <div
                className={`w-10 h-5 rounded-full relative transition-all duration-200 ${
                  isBgRemoveActive ? "bg-green-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${
                    isBgRemoveActive ? "translate-x-5" : ""
                  }`}
                />
              </div>
            </label>
          </div>
        )}
      </div>
      {/* Form Fields */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <field.icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              required={field.required}
              className="mt01 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 transition-all text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
