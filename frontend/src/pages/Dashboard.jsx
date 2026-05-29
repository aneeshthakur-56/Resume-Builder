import { useState, useEffect } from "react";
import { Search, FileText, SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";

// Import data and utilities
import { processRawData } from "../components/Dashboard/dashboardUtils";

// Import UI components
import SidebarFilter from "../components/Dashboard/SidebarFilter";
import ActionCards from "../components/Dashboard/ActionCards";
import ResumeCard from "../components/Dashboard/ResumeCard";
import Loader from "../components/Loader";
import {
  CreateResumeModal,
  EditResumeModal,
  UploadResumeModal,
} from "../components/Dashboard/ResumeModals";
import { makeApiRequest } from "../utils/apiService";
import { useNavigate } from "react-router";
import pdfToText from "react-pdftotext";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [resumes, setResumes] = useState(() => processRawData([]));
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: null, sort: "recent" });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await makeApiRequest("/api/resumes", "GET");
        if (response && response.success) {
          setResumes(processRawData(response.data || []));
        }
      } catch (error) {
        console.error("Error loading resumes:", error);
        toast.error("Failed to load resumes");
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await makeApiRequest(
        `/api/resumes/delete/${id}`,
        "DELETE",
        {},
      );
      if (response && response.success) {
        setResumes((prev) => prev.filter((r) => r._id !== id));
        toast.success(response.message || "Resume deleted successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete resume");
    }
  };

  const handleCreateSubmit = async (title) => {
    if (user?.email === "demo@example.com" && resumes.length >= 1) {
      toast.error("Guest users are limited to 1 resume. Please sign up to create more!");
      return;
    }
    try {
      const res = await makeApiRequest("/api/resumes/create", "POST", {
        title,
      });
      const processedItem = processRawData([res.data])[0];
      setResumes([...resumes, processedItem]);
      setShowCreateResume(false);
      navigate(`/app/builder/${res.data._id}`);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleUploadSubmit = async ({ file, title }) => {
    if (user?.email === "demo@example.com" && resumes.length >= 1) {
      toast.error("Guest users are limited to 1 resume. Please sign up to create more!");
      return;
    }
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(file);
      const res = await makeApiRequest("/api/ai/upload-resume", "POST", {
        title,
        resumeText,
      });
      const processedItem = processRawData([res.data.data || res.data])[0];
      setResumes([...resumes, processedItem]);
      setShowUploadResume(false);
      console.log(res);
      navigate(`/app/builder/${res.data.resumeId}`);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditResume = async (id, newTitle) => {
    try {
      const response = await makeApiRequest("/api/resumes/update", "PUT", {
        resumeId: id,
        resumeData: { title: newTitle },
      });
      if (response && response.success) {
        const processedItem = processRawData([response.data])[0];
        setResumes((prev) =>
          prev.map((r) => (r._id === id ? processedItem : r)),
        );
        toast.success(response.message || "Title updated successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update title");
    }
  };

  if (isLoading) {
    return <Loader message="Parsing and uploading your resume..." />;
  }

  const activeFilterCount = [
    filters.status,
    filters.sort !== "recent" ? filters.sort : null,
  ].filter(Boolean).length;

  const processed = resumes
    .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
    .filter((r) => (filters.status ? r.status === filters.status : true))
    .sort((a, b) => {
      if (filters.sort === "recent") return b.updatedTs - a.updatedTs;
      if (filters.sort === "oldest") return a.updatedTs - b.updatedTs;
      if (filters.sort === "score_hi") return b.score - a.score;
      if (filters.sort === "score_lo") return a.score - b.score;
      if (filters.sort === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashHeader}>
        <h1>My Resumes</h1>
        <p>Create, upload, and manage all your resumes in one place.</p>
      </div>

      <div className={styles.layout}>
        {user?.email !== "demo@example.com" && (
          <div className={styles.desktopSidebarWrapper}>
            <SidebarFilter filters={filters} setFilters={setFilters} />
          </div>
        )}

        <main className={styles.mainContent}>
          {/* Wire up the click handlers here */}
          <ActionCards
            onCreateClick={() => setShowCreateResume(true)}
            onUploadClick={() => setShowUploadResume(true)}
          />

          <hr className={styles.sectionDivider} />

          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Your Resumes
              <span className={styles.sectionCount}>{processed.length}</span>
            </h2>

            {user?.email !== "demo@example.com" && (
              <div className={styles.searchRow}>
                <div className={styles.searchWrap}>
                  <Search size={16} />
                  <input
                    className={styles.searchInput}
                    placeholder="Search resumes…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <button
                  className={`${styles.mobileFilterBtn} ${mobileFilterOpen || activeFilterCount > 0 ? styles.mobileFilterBtnActive : ""}`}
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                >
                  <SlidersHorizontal size={14} />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className={styles.filterBadge}>
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {user?.email !== "demo@example.com" && mobileFilterOpen && (
            <div className={styles.mobileFilterWrapper}>
              <SidebarFilter
                filters={filters}
                setFilters={setFilters}
                isMobile={true}
              />
            </div>
          )}

          <div className={styles.resumeGrid}>
            {processed.length === 0 ? (
              <div className={styles.emptyState}>
                <FileText size={36} color="#d1d5db" />
                <p>No resumes match your criteria</p>
              </div>
            ) : (
              processed.map((r, i) => (
                <div
                  key={r._id}
                  style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                >
                  <ResumeCard
                    resume={r}
                    onDelete={handleDelete}
                    setEditResumeId={setEditResumeId}
                  />
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* ── Render Modals conditionally based on state ── */}
      {showCreateResume && (
        <CreateResumeModal
          onClose={() => setShowCreateResume(false)}
          onSubmit={handleCreateSubmit}
        />
      )}

      {showUploadResume && (
        <UploadResumeModal
          onClose={() => setShowUploadResume(false)}
          onUpload={handleUploadSubmit}
        />
      )}
      {editResumeId && (
        <EditResumeModal
          resumeTitle={resumes.find((r) => r._id === editResumeId)?.title ?? ""}
          onClose={() => setEditResumeId(null)}
          onSubmit={(newTitle) => handleEditResume(editResumeId, newTitle)}
        />
      )}
    </div>
  );
}
