import { useState, useEffect, useMemo, useCallback } from "react";
import { getFixtures } from "../services/cricketApi";
import MatchCard from "./MatchCard";
import ScoreboardLoader from "./Loaders/ScoreboardLoader";

const FILTERS = ["All", "T20I", "ODI", "Test"];

/**
 * Fixtures – Tab 2
 * Animation: slides in from RIGHT (upcoming/forward feel)
 */
const Fixtures = ({ openSignup }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let alive = true;
    getFixtures()
      .then((data) => {
        if (alive) {
          setMatches(data);
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

  // useMemo – only recomputes when matches or filter changes
  const filtered = useMemo(
    () =>
      filter === "All"
        ? matches
        : matches.filter((m) => m.matchType === filter),
    [matches, filter],
  );

  const handleFilter = useCallback((tag) => setFilter(tag), []);

  if (loading) return <ScoreboardLoader count={4} />;
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
        className="slide-right"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.3rem" }}>📅</span>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            Upcoming Fixtures
          </h2>
          <span
            style={{
              background: "rgba(59,130,246,.12)",
              color: "var(--blue)",
              fontSize: ".72rem",
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 999,
              border: "1px solid rgba(59,130,246,.25)",
            }}
          >
            {filtered.length} matches
          </span>
        </div>
        {/* Filter pills */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginLeft: "auto",
          }}
        >
          {FILTERS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilter(tag)}
              className={`pill ${filter === tag ? "active" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="card scale-up"
          style={{ textAlign: "center", padding: "64px 16px" }}
        >
          <p style={{ fontSize: 3 + "rem", marginBottom: 12 }}>📭</p>
          <p style={{ color: "var(--text-muted)" }}>
            No {filter} fixtures found.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 16,
          }}
        >
          {filtered.map((m, i) => (
            <MatchCard
              key={m.id}
              match={m}
              openSignup={openSignup}
              animCls={`slide-right d${Math.min(i + 1, 6)}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default Fixtures;
