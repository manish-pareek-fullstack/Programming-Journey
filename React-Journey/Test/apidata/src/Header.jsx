import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/Form">Form</Link>
      <Link to='/Abc'>Abc</Link>
    </div>
  );
};

export default Header;
