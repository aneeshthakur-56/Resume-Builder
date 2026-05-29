import { useState, useRef } from "react";
import { X, UploadCloud, FileText } from "lucide-react";
import styles from "./ResumeModals.module.css";

// ─── Create Resume Modal ──────────────────────────────────────────────
export function CreateResumeModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Create New Resume</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <label className={styles.inputLabel}>Resume Title</label>
          <input
            autoFocus
            type="text"
            placeholder="e.g., Senior Frontend Engineer - Google"
            className={styles.textInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!title.trim()}
            >
              Create Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Upload Resume Modal ──────────────────────────────────────────────
export function UploadResumeModal({ onClose, onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(""); // Removed the empty space

  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file || !title.trim()) return; 
    onUpload({ file, title });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Upload Existing Resume</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Moved the input INSIDE the modalBody so it gets proper padding */}
        <div className={styles.modalBody}>
          <label className={styles.inputLabel}>Resume Title</label>
          <input
            autoFocus
            type="text"
            placeholder="e.g., Senior Frontend Engineer - Google"
            className={styles.textInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {!file ? (
            <div
              className={`${styles.dropZone} ${dragOver ? styles.dragOver : ""}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className={styles.uploadIconWrap}>
                <UploadCloud size={28} color="#16a34a" />
              </div>
              <p className={styles.dropTitle}>
                Click to upload or drag and drop
              </p>
              <p className={styles.dropDesc}>PDF, DOC, or DOCX (max. 5MB)</p>
            </div>
          ) : (
            <div className={styles.fileSelected}>
              <FileText size={24} color="#16a34a" />
              <div className={styles.fileInfo}>
                <p className={styles.fileName}>{file.name}</p>
                <p className={styles.fileSize}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                className={styles.removeFileBtn}
                onClick={() => setFile(null)}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className={styles.modalActions}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.submitBtn}
              disabled={!file || !title.trim()} // Disable if either file or title is missing
              onClick={handleSubmit}
            >
              Parse & Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditResumeModal({ resumeTitle = "", onClose, onSubmit }) {
  const [title, setTitle] = useState(resumeTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Edit Resume Title</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <label className={styles.inputLabel}>Resume Title</label>
          <input
            autoFocus
            type="text"
            placeholder="e.g., Senior Frontend Engineer - Google"
            className={styles.textInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!title.trim()}
            >
              Update Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
