import { useState, useEffect, useMemo, useCallback } from "react";
import { getTeams } from "../services/cricketApi";
import TeamCard from "./TeamCard";
import TeamLoader from "./Loaders/TeamLoader";

/**
 * Teams – Tab 3
 * Animation: scale-up (teams are stable/present, not directional)
 */
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let alive = true;
    getTeams()
      .then((data) => {
        if (alive) {
          setTeams(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (alive) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  const handleSearch = useCallback((e) => setSearch(e.target.value), []);

  // useMemo – expensive filter operation memoized
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortname.toLowerCase().includes(q) ||
        t.captain.toLowerCase().includes(q),
    );
  }, [teams, search]);

  if (loading) return <TeamLoader count={6} />;
  if (error)
    return (
      <div
        className="fade-in"
        style={{ textAlign: "center", padding: "64px 16px" }}
      >
        <p style={{ color: "var(--red)" }}>{error}</p>
      </div>
    );

  return (
    <section className="fade-in">
      {/* Header */}
      <div
        className="scale-up"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.3rem" }}>🌍</span>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            International Teams
          </h2>
          <span
            style={{
              background: "rgba(34,197,94,.1)",
              color: "var(--green)",
              fontSize: ".72rem",
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 999,
              border: "1px solid rgba(34,197,94,.25)",
            }}
          >
            {filtered.length} teams
          </span>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginLeft: "auto" }}>
          <input
            className="inp"
            value={search}
            onChange={handleSearch}
            placeholder="Search teams…"
            style={{ width: 200, paddingRight: 36 }}
          />
          <svg
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 14,
              height: 14,
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="card scale-up"
          style={{ textAlign: "center", padding: "64px 16px" }}
        >
          <p style={{ fontSize: 3 + "rem", marginBottom: 12 }}>🔍</p>
          <p style={{ color: "var(--text-muted)" }}>
            No teams found for "{search}"
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((team, i) => (
            <TeamCard
              key={team.id}
              team={team}
              animCls={`scale-up d${Math.min(i + 1, 6)}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default Teams;
