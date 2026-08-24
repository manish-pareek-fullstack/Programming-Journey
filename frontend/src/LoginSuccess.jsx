import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSuccess.css";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Find out the logged-in user's role, then send them to the
      // correct dashboard (admin vs employee).
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          withCredentials: true,
        });

        const role = res.data.user?.role;

        navigate(role === "admin" ? "/admin" : "/employee");
      } catch (error) {
        navigate("/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-wrapper">
      <div className="success-card">
        {/* Animated checkmark */}
        <div className="checkmark-ring">
          {/* Outer spinning ring */}
          <svg
            className="ring-svg"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="36" stroke="#d1fae5" strokeWidth="2" />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="226"
              strokeDashoffset="56"
              transform="rotate(-90 40 40)"
            />
          </svg>

          {/* Inner green circle with checkmark */}
          <div className="checkmark-inner">
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h2>You're in</h2>
        <p>Login successful — taking you to your dashboard</p>

        <div className="success-progress">
          <div className="success-progress-bar" />
        </div>

        <div className="success-redirect">
          <span className="success-dot" />
          Redirecting...
        </div>
      </div>
    </div>
  );
};

export default LoginSuccess;
