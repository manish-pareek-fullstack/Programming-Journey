import { memo, useMemo } from "react";

const TeamCard = memo(({ team, animCls = "" }) => {
  const winPct = useMemo(
    () => Math.round((team.w / team.m) * 100),
    [team.w, team.m],
  );
  const isTop3 = team.rank <= 3;

  return (
    <div
      className={`card ${animCls}`}
      style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}
    >
      {/* Rank */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: ".8rem",
          fontFamily: "var(--font-head)",
          fontWeight: 700,
          flexShrink: 0,
          background: isTop3 ? "rgba(245,158,11,.15)" : "var(--bg-hover)",
          color: isTop3 ? "var(--amber)" : "var(--text-muted)",
          border: `1px solid ${isTop3 ? "rgba(245,158,11,.35)" : "var(--border)"}`,
        }}
      >
        #{team.rank}
      </div>

      {/* Flag */}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          flexShrink: 0,
          border: "1.5px solid var(--border)",
          background: `${team.color}18`,
        }}
      >
        {team.flag}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--text)",
            }}
          >
            {team.name}
          </span>
          <span
            className="mono"
            style={{
              fontSize: ".7rem",
              color: "var(--text-muted)",
              background: "var(--bg-hover)",
              padding: "1px 6px",
              borderRadius: 4,
            }}
          >
            {team.shortname}
          </span>
        </div>
        <p
          style={{
            fontSize: ".75rem",
            color: "var(--text-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {team.captain} · {team.coach}
        </p>
      </div>

      {/* Win% */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          flexShrink: 0,
        }}
      >
        <span
          className="mono"
          style={{ fontSize: ".85rem", fontWeight: 700, color: team.color }}
        >
          {winPct}%
        </span>
        <div
          style={{
            width: 72,
            height: 5,
            borderRadius: 999,
            background: "var(--bg-hover)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 999,
              width: `${winPct}%`,
              background: team.color,
              transition: "width .6s ease",
            }}
          />
        </div>
        <span style={{ fontSize: ".7rem", color: "var(--text-muted)" }}>
          {team.w}W / {team.m}M
        </span>
      </div>
    </div>
  );
});
TeamCard.displayName = "TeamCard";
export default TeamCard;
