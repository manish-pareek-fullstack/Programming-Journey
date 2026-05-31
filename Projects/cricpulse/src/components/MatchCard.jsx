import { memo, useState, useCallback } from "react";
import useProtectedAction from "../hooks/useProtectedAction";

const TAG = {
  T20I: "tag-t20",
  T20: "tag-t20",
  ODI: "tag-odi",
  Test: "tag-test",
};

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const Team = memo(({ info }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      flex: 1,
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "1.5px solid var(--border)",
        background: "var(--bg-hover)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
      }}
    >
      🏏
    </div>
    <span
      style={{
        fontSize: ".75rem",
        fontFamily: "var(--font-head)",
        fontWeight: 700,
        color: "var(--text-muted)",
        letterSpacing: ".05em",
      }}
    >
      {info?.shortname || "?"}
    </span>
  </div>
));
Team.displayName = "Team";

const MatchCard = memo(({ match, openSignup, animCls = "" }) => {
  const protect = useProtectedAction(openSignup);
  const [liked, setLiked] = useState(false);

  const handleLike = useCallback(
    protect(() => setLiked((l) => !l)),
    [protect],
  );

  const t1 = match.teamInfo?.[0];
  const t2 = match.teamInfo?.[1];
  const s1 = match.score?.[0];
  const s2 = match.score?.[1];

  return (
    <div className={`card ${animCls}`} style={{ padding: 20 }}>
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <span
          className={`${TAG[match.matchType] || "tag-odi"}`}
          style={{
            fontSize: ".7rem",
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            letterSpacing: ".06em",
            padding: "3px 10px",
            borderRadius: 999,
          }}
        >
          {match.matchType}
        </span>
        {match.isLive ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: ".75rem",
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              color: "var(--red)",
            }}
          >
            <span
              className="live-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--red)",
                display: "inline-block",
              }}
            />
            LIVE
          </span>
        ) : (
          <span style={{ fontSize: ".75rem", color: "var(--text-muted)" }}>
            {fmt(match.dateTimeGMT)}
          </span>
        )}
      </div>

      {/* Teams + score */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <Team info={t1} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
            padding: "0 4px",
          }}
        >
          {s1 || s2 ? (
            <>
              {s1 && (
                <span
                  className="mono"
                  style={{
                    fontSize: ".8rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {s1.r}/{s1.w}{" "}
                  <span
                    style={{ color: "var(--text-muted)", fontSize: ".7rem" }}
                  >
                    ({s1.o})
                  </span>
                </span>
              )}
              <span
                style={{
                  fontSize: ".7rem",
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  color: "var(--amber)",
                }}
              >
                VS
              </span>
              {s2 && (
                <span
                  className="mono"
                  style={{
                    fontSize: ".8rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {s2.r}/{s2.w}{" "}
                  <span
                    style={{ color: "var(--text-muted)", fontSize: ".7rem" }}
                  >
                    ({s2.o})
                  </span>
                </span>
              )}
            </>
          ) : (
            <span
              style={{
                fontSize: "1.1rem",
                fontFamily: "var(--font-head)",
                fontWeight: 700,
                color: "var(--amber)",
              }}
            >
              VS
            </span>
          )}
        </div>
        <Team info={t2} />
      </div>

      {/* Match name */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-head)",
          fontWeight: 600,
          fontSize: ".9rem",
          color: "var(--text)",
          marginBottom: 12,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {match.name}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--border)",
          paddingTop: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            overflow: "hidden",
          }}
        >
          <svg
            style={{
              width: 12,
              height: 12,
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span
            style={{
              fontSize: ".72rem",
              color: "var(--text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {match.venue}
          </span>
        </div>
        {/* Protected like button – shows signup if not logged in */}
        <button
          onClick={handleLike}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "transform .15s",
            opacity: liked ? 1 : 0.4,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title="Sign up to like"
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
});
MatchCard.displayName = "MatchCard";
export default MatchCard;
