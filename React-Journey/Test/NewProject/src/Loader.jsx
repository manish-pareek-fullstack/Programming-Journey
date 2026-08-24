import React from "react";
import "./Loader.css";

/**
 * Loader Component
 *
 * Props:
 *  - fullPage (bool, default true) — full screen overlay or section-level
 *  - label    (string)             — text shown below dots (default "Loading")
 *
 * Usage:
 *   Full page:    <Loader />
 *   Section:      <Loader fullPage={false} label="Fetching students" />
 */
const Loader = ({ fullPage = true, label = "Loading" }) => {
  if (fullPage) {
    return (
      <div className="page-loader">
        {/* Brand logo mark */}
        <div className="loader-logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        {/* Bouncing dots */}
        <div className="loader-dots">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>

        <span className="loader-label">{label}</span>
      </div>
    );
  }

  return (
    <div className="section-loader">
      <div className="loader-dots">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
      <span className="loader-label">{label}</span>
    </div>
  );
};

export default Loader;
