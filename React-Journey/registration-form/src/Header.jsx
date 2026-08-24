import React from "react";
import Home from "./Home";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/About"}>About</Link>
      <Link to={"/Signup"}>Signup</Link>
      <Link to={"/Login"}>Login</Link>
    </div>
  );
};

export default Header;
