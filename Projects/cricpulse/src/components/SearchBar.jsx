/* SearchBar.jsx – Debounced search with dropdown results */
import { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import { searchAll } from "../services/cricketApi";
import SearchLoader from "./Loaders/SearchLoader";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedQ = useDebounce(query, 400); // ← debounce: wait 400ms after user stops typing
  const ref = useRef(null);

  /* Run search whenever debouncedQ changes */
  useEffect(() => {
    if (!debouncedQ.trim()) {
      setResults(null);
      setOpen(false);
      return;
    }
    setLoading(true);
    setOpen(true);
    searchAll(debouncedQ)
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [debouncedQ]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalResults =
    (results?.matches?.length || 0) + (results?.teams?.length || 0);

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      {/* Input */}
      <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 transition-all focus-within:border-[var(--accent-green)] focus-within:shadow-[0_0_0_3px_rgba(0,214,50,0.12)]">
        <svg
          className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0"
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
          className="bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] w-full outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults(null);
              setOpen(false);
            }}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 glass-card rounded-2xl border border-[var(--border)] shadow-2xl z-50 overflow-hidden animate-fade-in-down max-h-96 overflow-y-auto">
          {loading ? (
            <SearchLoader />
          ) : totalResults === 0 ? (
            <div className="px-4 py-5 text-center text-[var(--text-muted)] text-sm">
              No results for{" "}
              <strong className="text-[var(--text-primary)]">
                "{debouncedQ}"
              </strong>
            </div>
          ) : (
            <>
              {/* Match results */}
              {results.matches.length > 0 && (
                <>
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">
                      Matches
                    </p>
                  </div>
                  {results.matches.map((m) => (
                    <div
                      key={m.id}
                      className="px-4 py-3 hover:bg-[var(--bg-hover)] cursor-pointer transition-colors flex items-center gap-3 border-b border-[var(--border)] last:border-0"
                    >
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${m.isLive ? "bg-red-500 animate-live-pulse" : "bg-blue-400"}`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {m.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] truncate">
                          {m.venue}
                        </p>
                      </div>
                      <span className="ml-auto text-xs text-[var(--text-muted)] flex-shrink-0">
                        {m.matchType}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {/* Team results */}
              {results.teams.length > 0 && (
                <>
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">
                      Teams
                    </p>
                  </div>
                  {results.teams.map((t) => (
                    <div
                      key={t.id}
                      className="px-4 py-3 hover:bg-[var(--bg-hover)] cursor-pointer transition-colors flex items-center gap-3 border-b border-[var(--border)] last:border-0"
                    >
                      <span className="text-xl">{t.img}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {t.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Rank #{t.ranking} · {t.captain}
                        </p>
                      </div>
                      <span className="ml-auto text-xs font-mono text-[var(--text-muted)]">
                        {t.shortname}
                      </span>
                    </div>
                  ))}
                </>
              )}

              <div className="px-4 py-2 text-center border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)]">
                  {totalResults} result{totalResults !== 1 ? "s" : ""} found
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
