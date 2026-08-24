import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

// allowedRoles is optional.
// - No allowedRoles  -> just needs to be logged in (any role)
// - allowedRoles=["admin"] -> only admin can enter
// - allowedRoles=["admin","employee"] -> any logged-in role can enter
//
// IMPORTANT: this is a UX convenience only (hides pages/links).
// The backend (authMiddleware + adminMiddleware) is what ACTUALLY
// blocks unauthorized API calls, even if someone bypasses this check.
const Protect = ({ children, allowedRoles }) => {
  const [loading, setLoading] = React.useState(true);
  const [isLogin, setIsLogin] = React.useState(false);
  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(true);
        setRole(res.data.user?.role);
      })
      .catch(() => {
        setIsLogin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in, but wrong role for this section -> send home
    return <Navigate to="/" />;
  }

  return children;
};

export default Protect;
