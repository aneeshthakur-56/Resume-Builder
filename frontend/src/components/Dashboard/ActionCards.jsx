import { ArrowUpRight, FilePlus2, Upload } from "lucide-react";
import styles from "./ActionCards.module.css";

export default function ActionCards({ onUploadClick, onCreateClick }) {
  return (
    <div className={styles.dashActions}>
      {/* Upload Card */}
      <div
        className={`${styles.actionCard} ${styles.upload}`}
        onClick={onUploadClick}
        role="button"
        tabIndex={0}
      >
        <div className={`${styles.actionIcon} ${styles.greenLight}`}>
          <Upload size={20} color="#16a34a" />
        </div>
        <div>
          <p className={styles.actionLabel}>Upload Resume</p>
          <p className={styles.actionDesc}>
            Drop a PDF or Word file to parse and enhance your existing resume.
          </p>
        </div>
        <button className={styles.actionCta}>
          Browse files <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Create Card */}
      <div
        className={`${styles.actionCard} ${styles.create}`}
        onClick={onCreateClick}
        role="button"
        tabIndex={0}
      >
        <div className={`${styles.actionIcon} ${styles.whiteLight}`}>
          <FilePlus2 size={20} color="#fff" />
        </div>
        <div>
          <p className={styles.actionLabel}>Create from Scratch</p>
          <p className={styles.actionDesc}>
            Build a polished resume step-by-step using our guided editor.
          </p>
        </div>
        <button className={styles.actionCta}>
          Get started <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
