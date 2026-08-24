import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLayout = () => {
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
        <h3 className="dash-sidebar-title">Admin Panel</h3>

        <nav className="dash-nav">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/employees" className={linkClass}>
            Employees
          </NavLink>
          <NavLink to="/admin/departments" className={linkClass}>
            Departments
          </NavLink>
          <NavLink to="/admin/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/admin/tasks" className={linkClass}>
            Tasks
          </NavLink>
          <NavLink to="/admin/attendance" className={linkClass}>
            Attendance
          </NavLink>
          <NavLink to="/admin/leaves" className={linkClass}>
            Leaves
          </NavLink>
          <NavLink to="/admin/work-reports" className={linkClass}>
            Work Reports
          </NavLink>
          <NavLink to="/admin/notifications" className={linkClass}>
            Notifications
          </NavLink>
          <NavLink to="/admin/audit-logs" className={linkClass}>
            Audit Logs
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

export default AdminLayout;
