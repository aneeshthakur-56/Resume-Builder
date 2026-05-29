import React from "react";
import Title from "./Title";
import {Zap} from "lucide-react"
const Feature = () => {
  const [activeCard, setActiveCard] = React.useState(0);

  const features = [
    {
      title: "AI-Powered Suggestions",
      description:
        "Generate tailored bullet points and professional summaries in seconds with smart AI suggestions.",
      activeBorderClass:
        "border-violet-300 bg-violet-50/80 shadow-md shadow-violet-100/50 scale-[1.02]",
      inactiveBorderClass:
        "border-slate-100 bg-white hover:border-violet-200 hover:bg-violet-50/20",
      iconColorClass: "text-violet-600 bg-violet-50",
      iconActiveColorClass: "text-white bg-violet-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 flex-shrink-0"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
          <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
        </svg>
      ),
    },
    {
      title: "ATS-Optimized Templates",
      description:
        "Format your resume automatically to pass applicant tracking systems and stand out to recruiters.",
      activeBorderClass:
        "border-green-300 bg-green-50/80 shadow-md shadow-green-100/50 scale-[1.02]",
      inactiveBorderClass:
        "border-slate-100 bg-white hover:border-green-200 hover:bg-green-50/20",
      iconColorClass: "text-green-600 bg-green-50",
      iconActiveColorClass: "text-white bg-green-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 flex-shrink-0"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "One-Click Export",
      description:
        "Instantly download your polished resume in PDF format, ready to send to top employers.",
      activeBorderClass:
        "border-orange-300 bg-orange-50/80 shadow-md shadow-orange-100/50 scale-[1.02]",
      inactiveBorderClass:
        "border-slate-100 bg-white hover:border-orange-200 hover:bg-orange-50/20",
      iconColorClass: "text-orange-600 bg-orange-50",
      iconActiveColorClass: "text-white bg-orange-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 flex-shrink-0"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-8  lg:py-12  bg-slate-50/50 border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 xl:px-12 flex flex-col gap-3 lg:gap-4">
        {/* Top Centered Header Block */}
        <div className="w-full text-center flex flex-col items-center">
          <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1">
            <Zap width={14} />
            <span>Simple Process</span>
          </div>
          <Title
            title="Build your resume"
            description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features."
          />
        </div>

        {/* Two Columns Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-16">
          {/* Left Side: Image container */}
          <div className="w-full lg:w-[55%] min-w-0 flex justify-center items-center">
            <img
              className="w-full max-w-2xl lg:max-w-xl xl:max-w-2xl h-auto object-contain transition-all duration-500 hover:scale-[1.01] -mb-6 sm:-mb-10 lg:mb-0"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
              alt="AI Powered Resume Builder Features"
            />
          </div>

          {/* Right Side: Features list (giving 45% width) */}
          <div className="w-full lg:w-[45%] min-w-0 flex flex-col gap-4 px-2 sm:px-4 md:px-0">
            {features.map((feature, index) => {
              const isActive = activeCard === index;
              return (
                <div
                  key={index}
                  className="flex items-center justify-start max-w-lg w-full cursor-pointer mx-auto lg:mx-0"
                  onMouseEnter={() => setActiveCard(index)}
                >
                  <div
                    className={`p-5 sm:p-6 w-full flex gap-4 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? feature.activeBorderClass
                        : feature.inactiveBorderClass
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? feature.iconActiveColorClass
                          : feature.iconColorClass
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm sm:max-w-md">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
