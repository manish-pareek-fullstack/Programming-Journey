import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/Child">Child</Link>
      <Link to="/Parents">Parents</Link>
    </div>
  );
};

export default Header;
