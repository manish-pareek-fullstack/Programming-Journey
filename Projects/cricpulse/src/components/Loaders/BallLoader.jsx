import { memo } from "react";
const BallLoader = memo(({ text = "Loading live scores…" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "64px 16px",
      gap: 20,
    }}
  >
    <div style={{ position: "relative", width: 56, height: 56 }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #ef4444, #7f1d1d)",
          animation: "bounceBall .85s ease-in-out infinite",
          boxShadow: "0 0 20px rgba(239,68,68,.3)",
        }}
      >
        <svg
          viewBox="0 0 56 56"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <path
            d="M28 7 Q42 17 42 28 Q42 39 28 49"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity=".5"
          />
          <path
            d="M28 7 Q14 17 14 28 Q14 39 28 49"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity=".5"
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 32,
          height: 6,
          background: "rgba(239,68,68,.2)",
          borderRadius: "50%",
          filter: "blur(3px)",
        }}
      />
    </div>
    <div className="dot-load" style={{ display: "flex", gap: 6 }}>
      <span />
      <span />
      <span />
    </div>
    <p
      style={{
        color: "var(--text-muted)",
        fontSize: ".85rem",
        letterSpacing: ".03em",
      }}
    >
      {text}
    </p>
  </div>
));
BallLoader.displayName = "BallLoader";
export default BallLoader;
