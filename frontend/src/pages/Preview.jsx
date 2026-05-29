import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResumePreview from "../components/ResumeBuilder/ResumePreview";
import Loader from "../components/Loader";
import { makeApiRequest } from "../utils/apiService";

const Preview = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await makeApiRequest(`/api/resumes/public/${resumeId}`, "GET");
        if (response && response.success) {
          setResumeData(response.data);
        }
      } catch (error) {
        console.error("Error fetching public resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  useEffect(() => {
    if (!loading && resumeData && window.location.search.includes("print=true")) {
      const timer = setTimeout(() => {
        window.focus();
        window.print();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, resumeData]);

  // Loader
  if (loading) {
    return <Loader />;
  }

  // Resume Not Found
  if (!resumeData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-700">
          Resume not found
        </h1>

        <p className="text-slate-500 mt-3 text-center">
          The resume you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          Go to Home Page
        </Link>
      </div>
    );
  }

  // Resume Preview
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white shadow-sm rounded-lg"
        />
      </div>
    </div>
  );
};

export default Preview;