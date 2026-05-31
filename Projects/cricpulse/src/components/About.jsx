import { memo } from "react";

const FEATURES = [
  {
    icon: "📡",
    title: "Real-Time Scores",
    desc: "Live ball-by-ball score updates worldwide.",
  },
  { icon: "📅", title: "Match Fixtures", desc: "Never miss an upcoming game." },
  {
    icon: "🌍",
    title: "International Teams",
    desc: "Stats & rankings for every nation.",
  },
  {
    icon: "🔍",
    title: "Debounced Search",
    desc: "Smart search — 400ms debounce, instant results.",
  },
  {
    icon: "🌙",
    title: "Dark / Light Mode",
    desc: "Theme persisted in localStorage.",
  },
  { icon: "📱", title: "Fully Responsive", desc: "Beautiful on every device." },
];

const About = memo(({ onClose }) => (
  <div className="overlay" onClick={onClose}>
    <div
      className="card scale-up"
      style={{
        width: "100%",
        maxWidth: 580,
        padding: 0,
        overflow: "hidden",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Hero */}
      <div
        style={{
          padding: "32px 32px 24px",
          background:
            "linear-gradient(135deg,rgba(34,197,94,.08) 0%,rgba(245,158,11,.04) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: "rgba(34,197,94,.12)",
                border: "1px solid rgba(34,197,94,.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                animation: "bounceBall .85s ease-in-out infinite",
              }}
            >
              🏏
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                Cricket Fever
              </h1>
              <p
                style={{
                  color: "var(--green)",
                  fontSize: ".85rem",
                  fontWeight: 600,
                }}
              >
                Follow every match. Live.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: ".875rem",
            lineHeight: 1.7,
          }}
        >
          Cricket Fever is a real-time cricket tracking app built with{" "}
          <strong style={{ color: "var(--text)" }}>React 18</strong>,{" "}
          <strong style={{ color: "var(--text)" }}>Tailwind CSS</strong>, and{" "}
          <strong style={{ color: "var(--text)" }}>Context API</strong>.
          Features live scores, upcoming fixtures, global teams, debounced
          search, and dark mode.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 1,
          borderBottom: "1px solid var(--border)",
          background: "var(--border)",
        }}
      >
        {[
          ["3+", "Live", "🔴"],
          ["12", "Teams", "🌍"],
          ["6+", "Fixtures", "📅"],
          ["100%", "Uptime", "⚡"],
        ].map(([v, l, e]) => (
          <div
            key={l}
            style={{
              background: "var(--bg-card)",
              padding: "16px 8px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1.4rem", marginBottom: 2 }}>{e}</p>
            <p
              className="mono"
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--green)",
              }}
            >
              {v}
            </p>
            <p style={{ fontSize: ".75rem", color: "var(--text-muted)" }}>
              {l}
            </p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: "24px 32px" }}>
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 16,
          }}
        >
          Features
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: 10,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`slide-left d${i + 1}`}
              style={{
                display: "flex",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 10,
                background: "var(--bg-hover)",
                border: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
                {f.icon}
              </span>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: ".875rem",
                    color: "var(--text)",
                  }}
                >
                  {f.title}
                </p>
                <p
                  style={{
                    fontSize: ".78rem",
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech + Links */}
      <div style={{ padding: "0 32px 32px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 20,
          }}
        >
          {[
            "React 18",
            "Vite",
            "Tailwind CSS",
            "Context API",
            "CricAPI",
            "React.memo",
            "useMemo",
            "useCallback",
          ].map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: ".75rem",
                fontFamily: "var(--font-head)",
                fontWeight: 700,
                border: "1px solid rgba(34,197,94,.3)",
                color: "var(--green)",
                background: "rgba(34,197,94,.06)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href="https://github.com/cricket-fever"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 18px",
              textDecoration: "none",
              fontSize: ".85rem",
            }}
          >
            <svg
              style={{ width: 16, height: 16 }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
          <a
            href="https://twitter.com/cricketfever"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 18px",
              textDecoration: "none",
              fontSize: ".85rem",
            }}
          >
            <svg
              style={{ width: 16, height: 16 }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </a>
          <button
            onClick={onClose}
            className="btn-green"
            style={{ marginLeft: "auto", padding: "9px 20px" }}
          >
            Back to Cricket
          </button>
        </div>
      </div>
    </div>
  </div>
));
About.displayName = "About";
export default About;
