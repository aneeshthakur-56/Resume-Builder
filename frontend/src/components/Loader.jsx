const Loader = ({ message = "Building your Resume..." }) => {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes progress {
          0%   { width: 0%; }
          100% { width: 95%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceDot {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
        .loader-shimmer {
          position: relative;
          overflow: hidden;
        }
        .loader-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          animation: shimmer 1.6s ease-in-out infinite;
        }
        .loader-progress {
          height: 100%;
          background: linear-gradient(90deg, #4ade80, #16a34a);
          border-radius: 999px;
          animation: progress 2.4s cubic-bezier(0.4,0,0.2,1) infinite alternate;
        }
        .loader-card {
          animation: fadeUp 0.35s ease both;
        }
        .loader-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #86efac;
          animation: bounceDot 1s ease-in-out infinite;
        }
        .loader-dot:nth-child(2) { animation-delay: 0.15s; }
        .loader-dot:nth-child(3) { animation-delay: 0.30s; }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          gap: "32px",
        }}
      >
        {/* Animated resume skeleton card */}
        <div
          className="loader-card"
          style={{
            width: "192px",
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Avatar + name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#dcfce7",
                flexShrink: 0,
              }}
              className="loader-shimmer"
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                className="loader-shimmer"
                style={{
                  height: "7px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  width: "100%",
                }}
              />
              <div
                className="loader-shimmer"
                style={{
                  height: "7px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  width: "66%",
                }}
              />
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                height: "5px",
                width: "35%",
                borderRadius: "4px",
                backgroundColor: "#86efac",
                marginBottom: "8px",
              }}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div
                className="loader-shimmer"
                style={{
                  height: "6px",
                  borderRadius: "4px",
                  backgroundColor: "#bfdbfe",
                  width: "100%",
                }}
              />
              <div
                className="loader-shimmer"
                style={{
                  height: "6px",
                  borderRadius: "4px",
                  backgroundColor: "#bfdbfe",
                  width: "75%",
                }}
              />
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                height: "5px",
                width: "35%",
                borderRadius: "4px",
                backgroundColor: "#86efac",
                marginBottom: "8px",
              }}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <div
                  className="loader-shimmer"
                  style={{
                    height: "6px",
                    borderRadius: "4px",
                    backgroundColor: "#e5e7eb",
                    width: "50%",
                  }}
                />
                <div
                  className="loader-shimmer"
                  style={{
                    height: "6px",
                    borderRadius: "4px",
                    backgroundColor: "#e5e7eb",
                    width: "50%",
                  }}
                />
              </div>
              <div
                className="loader-shimmer"
                style={{
                  height: "6px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  width: "100%",
                }}
              />
              <div
                className="loader-shimmer"
                style={{
                  height: "6px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  width: "60%",
                }}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <div
              style={{
                height: "5px",
                width: "35%",
                borderRadius: "4px",
                backgroundColor: "#86efac",
                marginBottom: "8px",
              }}
            />
            <div style={{ display: "flex", gap: "6px" }}>
              <div
                className="loader-shimmer"
                style={{
                  height: "6px",
                  borderRadius: "4px",
                  backgroundColor: "#bbf7d0",
                  width: "40%",
                }}
              />
              <div
                className="loader-shimmer"
                style={{
                  height: "6px",
                  borderRadius: "4px",
                  backgroundColor: "#bbf7d0",
                  width: "40%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: "192px" }}>
          <p
            style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}
          >
            {message}
          </p>
          <div
            style={{
              height: "4px",
              backgroundColor: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div className="loader-progress" />
          </div>
        </div>

        {/* Bouncing dots */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div className="loader-dot" />
          <div className="loader-dot" />
          <div className="loader-dot" />
          <span
            style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "4px" }}
          >
            Please wait
          </span>
        </div>
      </div>
    </>
  );
};

export default Loader;
