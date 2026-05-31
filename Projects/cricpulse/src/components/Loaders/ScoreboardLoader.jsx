import { memo } from "react";
const Card = () => (
  <div
    className="card"
    style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="skel" style={{ width: 52, height: 20 }} />
      <div className="skel" style={{ width: 80, height: 20 }} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          className="skel"
          style={{ width: 44, height: 44, borderRadius: "50%" }}
        />
        <div className="skel" style={{ width: 40, height: 14 }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div className="skel" style={{ width: 32, height: 18 }} />
        <div className="skel" style={{ width: 20, height: 12 }} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          className="skel"
          style={{ width: 44, height: 44, borderRadius: "50%" }}
        />
        <div className="skel" style={{ width: 40, height: 14 }} />
      </div>
    </div>
    <div
      className="skel"
      style={{ width: "65%", height: 12, margin: "0 auto" }}
    />
  </div>
);
const ScoreboardLoader = memo(({ count = 4 }) => (
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
      <div
        style={{
          fontSize: 32,
          animation: "batSwing 1.1s ease-in-out infinite",
        }}
      >
        🏏
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: ".85rem" }}>
        Loading fixtures…
      </p>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
        gap: 16,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`fade-in d${i + 1}`}>
          <Card />
        </div>
      ))}
    </div>
  </div>
));
ScoreboardLoader.displayName = "ScoreboardLoader";
export default ScoreboardLoader;
