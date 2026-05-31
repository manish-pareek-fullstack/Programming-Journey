import { useState, useEffect, useCallback } from "react";
import { getLiveMatches } from "../services/cricketApi";
import MatchCard from "./MatchCard";
import BallLoader from "./Loaders/BallLoader";

/**
 * LiveMatches – Tab 1
 * Animation: slides in from LEFT (incoming ball direction)
 * Props: openSignup – to show signup modal when unauthenticated user clicks any action
 */
const LiveMatches = ({ openSignup }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLiveMatches();
      setMatches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    getLiveMatches()
      .then((data) => {
        if (alive) {
          setMatches(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (alive) {
          setError(err.msg);
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <BallLoader text="Fetching live scores…" />;

  if (error)
    return (
      <div
        className="fade-in"
        style={{ textAlign: "center", padding: "64px 16px" }}
      >
        <p style={{ fontSize: 2.5 + "rem", marginBottom: 12 }}>⚠️</p>
        <p style={{ color: "var(--red)" }}>{error}</p>
        <button
          className="btn-outline"
          style={{ marginTop: 16 }}
          onClick={fetchData}
        >
          Retry
        </button>
      </div>
    );

  return (
    <section className="fade-in">
      {/* Header */}
      <div
        className="slide-left"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <span
          className="live-dot"
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "var(--red)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          Live Matches
        </h2>
        <span
          style={{
            marginLeft: "auto",
            background: "rgba(239,68,68,.12)",
            color: "var(--red)",
            fontSize: ".72rem",
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 999,
            border: "1px solid rgba(239,68,68,.25)",
          }}
        >
          {matches.length} LIVE
        </span>
      </div>

      {matches.length === 0 ? (
        <div
          className="card scale-up"
          style={{ textAlign: "center", padding: "64px 16px" }}
        >
          <p style={{ fontSize: 3 + "rem", marginBottom: 12 }}>🏏</p>
          <p
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-head)",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            No live matches right now
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: ".85rem",
              marginTop: 6,
            }}
          >
            Check Fixtures tab for upcoming games.
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
          {matches.map((m, i) => (
            <MatchCard
              key={m.id}
              match={m}
              openSignup={openSignup}
              animCls={`slide-left d${Math.min(i + 1, 6)}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default LiveMatches;
