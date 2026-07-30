import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem("islogin"));
  return (
    <div>
      <Link to="/">Home</Link>
      {login ? (
        <>
          <Link to="/Student Records">Student Records</Link>
        </>
      ) : (
        <>
          <Link to="/Signup">Signup</Link>
          <Link to="/Login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Header;
