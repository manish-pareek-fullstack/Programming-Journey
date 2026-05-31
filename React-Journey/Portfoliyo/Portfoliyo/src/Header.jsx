import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="logo">MP</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Skill">Skill</Link>
        <Link to="/Experience">Experience</Link>
        <Link to="/Goal">Goal</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Project">Project</Link>
        <Link to="/Qualification">Qualification</Link>
      </div>
    </nav>
  );
};

export default Header;
