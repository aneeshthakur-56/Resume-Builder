import { CheckCircle2, AlertCircle } from "lucide-react";

export const STATUS_META = {
  public: {
    label: "Public",
    icon: CheckCircle2,
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  private: {
    label: "Private",
    icon: AlertCircle,
    color: "#d97706",
    bg: "#fffbeb",
  },
};

export const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest First" },
  { value: "score_hi", label: "Score: High → Low" },
  { value: "score_lo", label: "Score: Low → High" },
  { value: "name", label: "Name A → Z" },
];

export const timeAgo = (dateStr) => {
  const date = new Date(dateStr);
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
};

export const processRawData = (data) =>
  data.map((r) => {
    let score = 30;
    if (r.professional_summary) score += 15;
    score += Math.min(25, (r.skills?.length || 0) * 2.5);
    score += Math.min(20, (r.experience?.length || 0) * 10);
    score += Math.min(10, (r.education?.length || 0) * 5);

    return {
      ...r,
      status: r.public ? "public" : "private",
      uiUpdatedAt: timeAgo(r.updatedAt),
      updatedTs: new Date(r.updatedAt).getTime(),
      score: Math.min(100, Math.round(score)),
      pages: (r.experience?.length || 0) > 2 ? 2 : 1,
    };
  });
