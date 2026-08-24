import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Logo } from "./auth/AuthUI";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          withCredentials: true,
        });

        setIsLogin(true);
        setRole(response.data.user?.role);
      } catch (error) {
        setIsLogin(false);
        setRole(null);
      }
    };

    checkLogin();
  }, [location.pathname]);

  // Auth pages render their own full-bleed layout (VisualPanel + card),
  // so the marketing header stays out of the way there.
  const hideOnAuthPages = ["/login", "/signup"].includes(location.pathname);
  if (hideOnAuthPages) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-ems-border bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-3">
          {isLogin ? (
            <Link
              to={role === "admin" ? "/admin" : "/employee"}
              className="px-4 py-2 rounded-lg bg-ems-primary text-white text-sm font-semibold hover:bg-ems-primary-dark transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-ems-ink text-sm font-semibold hover:bg-ems-bg transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-ems-primary text-white text-sm font-semibold hover:bg-ems-primary-dark transition"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
