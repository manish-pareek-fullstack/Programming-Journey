import { useState, useCallback, lazy, Suspense } from "react";
import Header from "../components/Header";
import BallLoader from "../components/Loaders/BallLoader";

// ── React.lazy – code splitting for performance ──────────────
// Each tab is loaded only when the user clicks it (not upfront)
const LiveMatches = lazy(() => import("../components/LiveMatches"));
const Fixtures = lazy(() => import("../components/Fixtures"));
const Teams = lazy(() => import("../components/Teams"));

const HERO_STATS = [
  {
    label: "Live Now",
    value: "3",
    color: "#ef4444",
    bg: "rgba(239,68,68,.1)",
    border: "rgba(239,68,68,.2)",
  },
  {
    label: "Today",
    value: "8",
    color: "#22c55e",
    bg: "rgba(34,197,94,.1)",
    border: "rgba(34,197,94,.2)",
  },
  {
    label: "Teams",
    value: "12",
    color: "#f59e0b",
    bg: "rgba(245,158,11,.1)",
    border: "rgba(245,158,11,.2)",
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // openSignup – passed to Header AND child components via props
  // Any protected button calls this → shows signup first
  const openSignup = useCallback(() => setShowSignup(true), []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header – gets tab state + auth modal state */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSignup={openSignup}
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
        {/* Hero */}
        <section
          className="slide-up"
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 16,
              color: "var(--text)",
            }}
          >
            Follow Every
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,var(--green),var(--amber))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Match. Live.
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Real-time scores, upcoming fixtures & global team rankings — all in
            one place.
          </p>
        </section>

        {/* Stats strip */}
        <div
          className="slide-up d2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="card"
              style={{
                padding: 16,
                textAlign: "center",
                background: s.bg,
                borderColor: s.border,
              }}
            >
              <p
                className="mono"
                style={{ fontSize: "1.5rem", fontWeight: 700, color: s.color }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: ".8rem",
                  color: "var(--text-muted)",
                  marginTop: 3,
                  fontFamily: "var(--font-head)",
                  fontWeight: 600,
                  letterSpacing: ".04em",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile tab pills (desktop tabs are in Header) */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            overflowX: "auto",
            paddingBottom: 4,
          }}
          className="show-mobile"
        >
          {[
            { key: "live", label: "🔴 Live" },
            { key: "fixtures", label: "📅 Fixtures" },
            { key: "teams", label: "🌍 Teams" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flexShrink: 0,
                padding: "8px 18px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-head)",
                fontWeight: 700,
                fontSize: ".85rem",
                transition: "all .2s",
                background:
                  activeTab === tab.key ? "var(--green)" : "var(--bg-hover)",
                color: activeTab === tab.key ? "#fff" : "var(--text-muted)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content – React.lazy + Suspense for fast initial load */}
        <Suspense fallback={<BallLoader text="Loading…" />}>
          {activeTab === "live" && <LiveMatches openSignup={openSignup} />}
          {activeTab === "fixtures" && <Fixtures openSignup={openSignup} />}
          {activeTab === "teams" && <Teams />}
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
