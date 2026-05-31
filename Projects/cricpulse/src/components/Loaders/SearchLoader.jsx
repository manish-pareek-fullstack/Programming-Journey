import { memo } from "react";
const SearchLoader = memo(() => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 16px",
    }}
  >
    <div
      style={{
        position: "relative",
        width: 28,
        height: 14,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%,#ef4444,#7f1d1d)",
          animation: "rollBall 1.3s ease-in-out infinite",
        }}
      >
        <svg
          viewBox="0 0 14 14"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <path
            d="M7 2 Q9.5 4.5 9.5 7 Q9.5 9.5 7 12"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity=".5"
          />
          <path
            d="M7 2 Q4.5 4.5 4.5 7 Q4.5 9.5 7 12"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity=".5"
          />
        </svg>
      </div>
    </div>
    <span style={{ color: "var(--text-muted)", fontSize: ".85rem" }}>
      Searching…
    </span>
  </div>
));
SearchLoader.displayName = "SearchLoader";
export default SearchLoader;
