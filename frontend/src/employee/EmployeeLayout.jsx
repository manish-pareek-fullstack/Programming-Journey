import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true },
      );

      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    isActive ? "dash-link active" : "dash-link";

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <h3 className="dash-sidebar-title">Employee Panel</h3>

        <nav className="dash-nav">
          <NavLink to="/employee" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/employee/profile" className={linkClass}>
            My Profile
          </NavLink>
          <NavLink to="/employee/tasks" className={linkClass}>
            My Tasks
          </NavLink>
          <NavLink to="/employee/attendance" className={linkClass}>
            Attendance
          </NavLink>
          <NavLink to="/employee/leaves" className={linkClass}>
            My Leaves
          </NavLink>
          <NavLink to="/employee/work-reports" className={linkClass}>
            Work Reports
          </NavLink>
          <NavLink to="/employee/notifications" className={linkClass}>
            Notifications
          </NavLink>
        </nav>

        <button className="dash-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="dash-content">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
