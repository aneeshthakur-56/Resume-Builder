import {
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  ArrowDownUp,
} from "lucide-react";
import styles from "./SidebarFilter.module.css";
import { STATUS_META, SORT_OPTIONS } from "./dashboardUtils";

export default function SidebarFilter({
  filters,
  setFilters,
  isMobile = false,
}) {
  const toggleFilter = (key, val) =>
    setFilters((f) => ({ ...f, [key]: f[key] === val ? null : val }));

  return (
    <aside
      className={`${styles.sidebar} ${isMobile ? styles.mobileSidebar : ""}`}
    >
      {/* Hide the title if it's rendered as the mobile dropdown (since the button says 'Filters') */}
      {!isMobile && (
        <h3 className={styles.sidebarTitle}>
          <SlidersHorizontal size={18} /> Filters
        </h3>
      )}

      <div>
        <p className={styles.fpLabel}>Visibility Status</p>
        <div className={styles.fpChips}>
          {["public", "private"].map((s) => (
            <button
              key={s}
              className={`${styles.fpChip} ${filters.status === s ? styles.fpChipActive : ""}`}
              onClick={() => toggleFilter("status", s)}
            >
              {s === "public" ? (
                <CheckCircle2 size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
              {STATUS_META[s].label}
            </button>
          ))}
        </div>
      </div>

      <hr className={styles.sidebarHr} />

      <div>
        <p className={styles.fpLabel}>
          <ArrowDownUp size={14} /> Sort by
        </p>
        <div className={styles.fpSortList}>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`${styles.fpSortItem} ${filters.sort === opt.value ? styles.fpSortItemActive : ""}`}
              onClick={() => setFilters((f) => ({ ...f, sort: opt.value }))}
            >
              {opt.label}
              {filters.sort === opt.value && <CheckCircle2 size={14} />}
            </button>
          ))}
        </div>
      </div>

      <button
        className={styles.fpReset}
        onClick={() => setFilters({ status: null, sort: "recent" })}
      >
        Reset filters
      </button>
    </aside>
  );
}
