export default function ScoreRing({ score }) {
  const r = 18,
    circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#ef4444";

  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="3.5"
      />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeDasharray={circ}
        strokeDashoffset={circ - (score / 100) * circ}
        strokeLinecap="round"
        transform="rotate(-90 24 24)"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={color}
        fontFamily="Poppins,sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}
