import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  const username = JSON.parse(localStorage.getItem("signup"));
  const isLogin = localStorage.getItem("islogin");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handellogout = () => {
    localStorage.removeItem("islogin");
    navigate("/Login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".user-profile")) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dashboard">
      {/* NAVBAR */}
      <div className="navbar">
        {/* Brand / Logo */}
        <div className="navbar-brand">
          <div className="navbar-logo">
            {/* Graduation cap SVG */}
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 10v6M2 10l10-5 10 5-10 5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12v5c3 3 9 3 12 0v-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2>
            Student <span>Dashboard</span>
          </h2>
        </div>

        {/* User avatar */}
        {isLogin && (
          <div className="user-profile">
            <div
              className="avatar"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {username?.name?.charAt(0).toUpperCase()}
            </div>

            {showDropdown && (
              <div className="dropdown">
                <h4>{username?.name}</h4>
                <p>{username?.email}</p>
                <button onClick={handellogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          alt="students"
          width="100%"
        />
        <div className="hero-text">
          <h1>Welcome to Student Dashboard</h1>
          <p>
            Manage student records, view data, and track everything in one
            place.
          </p>
        </div>
      </div>

      {/* QUICK INFO */}
      <div className="info-box">
        <h3>System Overview</h3>
        <p>
          This dashboard is built for managing students data with search, sort,
          edit and delete functionality.
        </p>
      </div>
    </div>
  );
};

export default Home;
