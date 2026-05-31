import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ toggeluse, themeuse }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLogin = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = JSON.parse(localStorage.getItem("currentuser"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/Login");
  }

  const navLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/Demo", label: "Demo", icon: "🛍️" },
    { to: "/Com", label: "Users", icon: "👥" },
    { to: "/Newapi", label: "Products", icon: "📦" },
    { to: "/About", label: "About", icon: "🎓" },
    { to: "/Event", label: "Event", icon: "⚡" },
    { to: "/Deatel", label: "Form", icon: "📝" },
    { to: "/Caculeter", label: "Calc", icon: "🔢" },
    { to: "/New", label: "New", icon: "✨" },
    { to: "/Test", label: "Test", icon: "🧪" },
    { to: "/Debounce", label: "Debounce", icon: "⏳" },
  ];

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⚛</span>
          <span className="navbar__logo-text">ReactApp</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? "navbar__link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="navbar__actions">
          {/* Theme toggle */}
          <button
            className="navbar__theme-btn"
            onClick={toggeluse}
            title="Toggle Theme"
          >
            {themeuse === "light" ? "🌙" : "☀️"}
          </button>

          {isLogin ? (
            <>
              <span className="navbar__welcome">
                Hi, {userdata?.name?.split(" ")[0]}
              </span>
              <Link to="/Api" className="navbar__api-btn">
                API
              </Link>

              <button className="navbar__logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="navbar__auth">
              <Link to="/Login" className="navbar__login-btn">
                Login
              </Link>
              <Link to="/Otp" className="navbar__api-btn">
                Otp
              </Link>
              <Link to="/Signup" className="navbar__signup-btn">
                Sign Up
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}
      >
        <div className="navbar__drawer-header">
          <span className="navbar__logo-text">⚛ ReactApp</span>
          <button
            className="navbar__drawer-close"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        {isLogin && (
          <div className="navbar__drawer-user">
            <div className="navbar__drawer-avatar">
              {userdata?.name?.charAt(0)}
            </div>
            <span>Welcome, {userdata?.name}</span>
          </div>
        )}

        <nav className="navbar__drawer-links">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__drawer-link ${location.pathname === link.to ? "navbar__drawer-link--active" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="navbar__drawer-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__drawer-footer">
          <button className="navbar__theme-btn" onClick={toggeluse}>
            {themeuse === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          {isLogin ? (
            <button className="navbar__logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="navbar__auth">
              <Link to="/Login" className="navbar__login-btn">
                Login
              </Link>
              <Link to="/Signup" className="navbar__signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}

export default Header;
