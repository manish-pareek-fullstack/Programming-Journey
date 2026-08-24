import React, { Children } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
const Protect = ({children}) => {
  const isLogin = JSON.parse(localStorage.getItem("islogin"));
  return isLogin ? children : <Navigate to='/Login' />;
  
}

export default Protect
