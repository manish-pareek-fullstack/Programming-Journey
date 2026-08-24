import React from 'react'
import { Link } from 'react-router-dom';
import "./Header.css"
const Header = ({ cdata }) => {
  console.log(cdata)
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="./Card">Card ({cdata.length})</Link>
      <Link to="./ModelCard">ModelCard</Link>
    </div>
  );
};

export default Header
