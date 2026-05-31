import { useState, useEffect, useRef, useCallback } from "react";
import useDebounce from "../hooks/useDebounce";
import { searchAll } from "../services/cricketApi";
import SearchLoader from "./Loaders/SearchLoader";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(query, 400); // ← debouncing magic
  const ref = useRef(null);

  // Run search on debounced value change
  useEffect(() => {
    if (!debounced.trim()) {
      setResults(null);
      setOpen(false);
      return;
    }
    let alive = true;
    setLoading(true);
    setOpen(true);
    searchAll(debounced)
      .then((data) => {
        if (alive) {
          setResults(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [debounced]);

  // Close on outside click
  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const clear = useCallback(() => {
    setQuery("");
    setResults(null);
    setOpen(false);
  }, []);
  const total = (results?.matches?.length || 0) + (results?.teams?.length || 0);

  return (
    <div
      ref={ref}
      style={{ position: "relative", width: "100%", maxWidth: 320 }}
    >
      {/* Input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--bg-hover)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "8px 14px",
          transition: "border-color .2s,box-shadow .2s",
        }}
        onFocusCapture={(e) =>
          (e.currentTarget.style.borderColor = "var(--green)")
        }
        onBlurCapture={(e) =>
          (e.currentTarget.style.borderColor = "var(--border)")
        }
      >
        <svg
          style={{
            width: 14,
            height: 14,
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results) setOpen(true);
          }}
          placeholder="Search matches, teams…"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: ".85rem",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
          }}
        />
        {query && (
          <button
            onClick={clear}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "1rem",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="card fade-down"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            zIndex: 100,
            overflow: "hidden",
            maxHeight: 360,
            overflowY: "auto",
            boxShadow: "0 16px 48px rgba(0,0,0,.35)",
          }}
        >
          {loading ? (
            <SearchLoader />
          ) : total === 0 ? (
            <div
              style={{
                padding: "16px",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: ".85rem",
              }}
            >
              No results for{" "}
              <strong style={{ color: "var(--text)" }}>{debounced}</strong>
            </div>
          ) : (
            <>
              {results.matches.length > 0 && (
                <>
                  <div
                    style={{
                      padding: "10px 14px 4px",
                      fontSize: ".72rem",
                      fontFamily: "var(--font-head)",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Matches
                  </div>
                  {results.matches.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        borderTop: "1px solid var(--border)",
                        transition: "background .15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--bg-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      <span
                        className="live-dot"
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          flexShrink: 0,
                          background: m.isLive ? "var(--red)" : "var(--blue)",
                          animation: m.isLive ? undefined : "none",
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: ".85rem",
                            fontWeight: 500,
                            color: "var(--text)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {m.name}
                        </p>
                        <p
                          style={{
                            fontSize: ".75rem",
                            color: "var(--text-muted)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {m.venue}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: ".7rem",
                          color: "var(--text-muted)",
                          flexShrink: 0,
                        }}
                      >
                        {m.matchType}
                      </span>
                    </div>
                  ))}
                </>
              )}
              {results.teams.length > 0 && (
                <>
                  <div
                    style={{
                      padding: "10px 14px 4px",
                      fontSize: ".72rem",
                      fontFamily: "var(--font-head)",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    Teams
                  </div>
                  {results.teams.map((t) => (
                    <div
                      key={t.id}
                      style={{
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        borderTop: "1px solid var(--border)",
                        transition: "background .15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--bg-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
                        {t.flag}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: ".85rem",
                            fontWeight: 500,
                            color: "var(--text)",
                          }}
                        >
                          {t.name}
                        </p>
                        <p
                          style={{
                            fontSize: ".75rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          Rank #{t.rank} · {t.captain}
                        </p>
                      </div>
                      <span
                        className="mono"
                        style={{
                          fontSize: ".72rem",
                          color: "var(--text-muted)",
                          flexShrink: 0,
                        }}
                      >
                        {t.shortname}
                      </span>
                    </div>
                  ))}
                </>
              )}
              <div
                style={{
                  padding: "8px 14px",
                  textAlign: "center",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p style={{ fontSize: ".72rem", color: "var(--text-muted)" }}>
                  {total} result{total !== 1 ? "s" : ""}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
