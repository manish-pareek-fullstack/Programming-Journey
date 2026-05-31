import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "./SearchBar";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

const TABS = [
  { key: "live", label: "Live", badge: true },
  { key: "fixtures", label: "Fixtures", badge: false },
  { key: "teams", label: "Teams", badge: false },
];

const Header = ({
  activeTab,
  setActiveTab,
  openSignup,
  showSignup,
  setShowSignup,
  showLogin,
  setShowLogin,
}) => {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userRef = useRef(null);

  // Close user menu on outside click
  useEffect(() => {
    const fn = (e) => {
      if (userRef.current && !userRef.current.contains(e.target))
        setUserMenu(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleTab = useCallback(
    (key) => {
      setActiveTab(key);
      setMobileOpen(false);
    },
    [setActiveTab],
  );

  const handleAuthBtn = useCallback(() => {
    // Show SIGNUP first (as per requirement)
    openSignup();
    setMobileOpen(false);
  }, [openSignup]);

  return (
    <>
      <header
        className="fade-down"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            height: 60,
            gap: 16,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(34,197,94,.12)",
                border: "1px solid rgba(34,197,94,.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              🏏
            </div>
            <span
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: ".02em",
                display: "none",
              }}
              className="sm-show"
            >
              Cricket<span style={{ color: "var(--green)" }}>Fever</span>
            </span>
          </div>

          {/* Desktop tabs */}
          <nav
            style={{ display: "flex", gap: 4, marginLeft: 8 }}
            className="hide-mobile"
          >
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTab(tab.key)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 14px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: ".875rem",
                    letterSpacing: ".03em",
                    transition: "all .2s",
                    background: active ? "var(--green-dim)" : "transparent",
                    color: active ? "var(--green)" : "var(--text-muted)",
                    outline: active ? "1px solid rgba(34,197,94,.3)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--bg-hover)";
                      e.currentTarget.style.color = "var(--text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-muted)";
                    }
                  }}
                >
                  {tab.label}
                  {tab.badge && (
                    <span
                      className="live-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--red)",
                        display: "inline-block",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <SearchBar />
          </div>

          {/* Right: dark toggle + auth */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
            className="hide-mobile"
          >
            {/* Dark/Light toggle – localStorage persisted via ThemeContext */}
            <button
              onClick={toggle}
              title={isDark ? "Switch to Light" : "Switch to Dark"}
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                border: "1px solid var(--border)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--green)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {user ? (
              <div ref={userRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenu((o) => !o)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "border-color .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--green)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: ".85rem",
                      fontWeight: 700,
                    }}
                  >
                    {user.avatar}
                  </div>
                  <span
                    style={{
                      fontSize: ".875rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      maxWidth: 80,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.name}
                  </span>
                </button>

                {userMenu && (
                  <div
                    className="card fade-down"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100%+8px)",
                      marginTop: 8,
                      width: 180,
                      zIndex: 100,
                      overflow: "hidden",
                      boxShadow: "0 12px 40px rgba(0,0,0,.3)",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: ".875rem",
                          fontWeight: 700,
                          color: "var(--text)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.name}
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
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenu(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--red)",
                        fontSize: ".875rem",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontFamily: "var(--font-body)",
                        transition: "background .15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(239,68,68,.08)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn-outline"
                  style={{ padding: "7px 16px", fontSize: ".85rem" }}
                >
                  Sign In
                </button>
                <button
                  onClick={openSignup}
                  className="btn-green"
                  style={{ padding: "7px 16px", fontSize: ".85rem" }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile: dark toggle + hamburger */}
          <div
            style={{ display: "flex", gap: 6, flexShrink: 0 }}
            className="show-mobile"
          >
            <button
              onClick={toggle}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
              }}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 16,
                    height: 2,
                    background: "var(--text-muted)",
                    borderRadius: 2,
                    display: "block",
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="slide-up"
            style={{
              borderTop: "1px solid var(--border)",
              padding: "12px 20px 16px",
              background: "var(--bg-card)",
            }}
          >
            {/* Tabs */}
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTab(tab.key)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  marginBottom: 4,
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: ".9rem",
                  background:
                    activeTab === tab.key ? "var(--green-dim)" : "transparent",
                  color:
                    activeTab === tab.key
                      ? "var(--green)"
                      : "var(--text-muted)",
                  textAlign: "left",
                  transition: "all .2s",
                }}
              >
                {tab.label}
                {tab.badge && (
                  <span
                    className="live-dot"
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--red)",
                      marginLeft: "auto",
                    }}
                  />
                )}
              </button>
            ))}
            {/* Auth */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 10,
                paddingTop: 10,
                borderTop: "1px solid var(--border)",
              }}
            >
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="btn-outline"
                  style={{ flex: 1, padding: "9px" }}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setMobileOpen(false);
                    }}
                    className="btn-outline"
                    style={{ flex: 1, padding: "9px" }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleAuthBtn}
                    className="btn-green"
                    style={{ flex: 1, padding: "9px" }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth modals – Signup shown FIRST */}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
    </>
  );
};

export default Header;
