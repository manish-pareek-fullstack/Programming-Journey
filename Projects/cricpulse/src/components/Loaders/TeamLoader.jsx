import { memo } from "react";
const Row = () => (
  <div
    className="card"
    style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}
  >
    <div
      className="skel"
      style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0 }}
    />
    <div
      className="skel"
      style={{ width: 46, height: 46, borderRadius: "50%", flexShrink: 0 }}
    />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
      <div className="skel" style={{ width: 100, height: 16 }} />
      <div className="skel" style={{ width: 70, height: 12 }} />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
      }}
    >
      <div className="skel" style={{ width: 36, height: 16 }} />
      <div
        className="skel"
        style={{ width: 64, height: 6, borderRadius: 999 }}
      />
    </div>
  </div>
);
const TeamLoader = memo(({ count = 6 }) => (
  <div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "40px 0 32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 8,
                height: 4,
                background: "#f59e0b",
                borderRadius: 2,
                marginBottom: 2,
                animation: `wobble .6s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
            <div
              style={{
                width: 6,
                height: 28 + i * 4,
                background: `linear-gradient(to bottom,#fbbf24,#d97706)`,
                borderRadius: "2px 2px 0 0",
                animation: `wobble .6s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          </div>
        ))}
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: ".85rem" }}>
        Loading teams…
      </p>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`slide-up d${i + 1}`}>
          <Row />
        </div>
      ))}
    </div>
  </div>
));
TeamLoader.displayName = "TeamLoader";
export default TeamLoader;
