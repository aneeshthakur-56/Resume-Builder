import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Clock,
  MoreVertical,
  Pencil,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import styles from "./ResumeCard.module.css";
import ScoreRing from "./ScoreRing";
import { STATUS_META } from "./dashboardUtils";
import { useNavigate } from "react-router";
import { triggerDirectDownload } from "../../utils/apiService";

export default function ResumeCard({ resume, onDelete, setEditResumeId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const statusKey = resume.status || (resume.public ? "public" : "private");
  const { label, icon: Icon, color, bg } = STATUS_META[statusKey] || STATUS_META.private;
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);
  return (
    <div className={styles.rCard}>
      <div className={styles.rCardTop}>
        <div className={styles.rCardIcon}>
          <FileText size={22} color="#16a34a" />
        </div>
        <div className={styles.rCardInfo}>
          <h3 className={styles.rCardTitle}>{resume.title}</h3>
          <div className={styles.rCardMeta}>
            <Clock size={11} color="#9ca3af" />
            <span>{resume.uiUpdatedAt}</span>
            <span className={styles.rDot} />
            <span>{resume.pages}p</span>
          </div>
        </div>
        <div className={styles.rCardScore}>
          <ScoreRing score={resume.score} />
        </div>

        <div style={{ position: "relative" }} ref={menuRef}>
          <button
            className={styles.rIconBtn}
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            aria-label="Options"
          >
            <MoreVertical size={16} />
          </button>
          {menuOpen && (
            <div className={styles.rMenu}>
              <button
                className={styles.rMenuItem}
                onClick={(e) => { e.stopPropagation(); setEditResumeId(resume._id); setMenuOpen(false); }}
              >
                <Pencil size={13} /> Edit
              </button>
              <div className={styles.rMenuDivider} />
              <button
                className={`${styles.rMenuItem} ${styles.rMenuItemDanger}`}
                onClick={(e) => { e.stopPropagation(); onDelete(resume._id); setMenuOpen(false); }}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.rCardBottom}>
        <span className={styles.rBadge} style={{ color, background: bg }}>
          <Icon size={11} /> {label}
        </span>
        <button
          className={styles.rEditBtn}
          onClick={() => navigate(`/app/builder/${resume._id}`)}
        >
          Edit resume <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}
