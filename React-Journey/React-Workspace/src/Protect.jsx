import { Children } from "react"
import { Link, Navigate } from "react-router-dom"

function Protect({ children }) {
  const isloggin = localStorage.getItem("token");
  return isloggin ? children : <Navigate to="/singup"/>;
}
export default Protect;

