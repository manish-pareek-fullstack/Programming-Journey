import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import Loader from "../Loader";
import { cardCls, StatusBadge, ErrorState } from "../lib/ui";

const EmployeeDashboardHome = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [attendanceToday, setAttendanceToday] = useState(null);
  const [notifCount, setNotifCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(false);

        const profileRes = await api.get("/profile");
        setProfile(profileRes.data.user);

        const employeeRes = await api.get("/employees/me");
        const employeeId = employeeRes.data.data._id;

        const [taskRes, attendanceRes, notifRes] = await Promise.all([
          api.get("/tasks", { params: { assignedTo: employeeId, limit: 5 } }),
          api.get("/attendance/me", {
            params: {
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
            },
          }),
          api.get("/notifications", { params: { limit: 1 } }),
        ]);

        setTasks(taskRes.data.data || []);
        const today = new Date().toDateString();
        setAttendanceToday(
          (attendanceRes.data.data || []).find((r) => new Date(r.date).toDateString() === today) ||
            null,
        );
        setNotifCount(notifRes.data.unreadCount || 0);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <Loader fullPage={false} label="Loading dashboard" />;
  if (error) return <ErrorState />;

  return (
    <div>
      <h2 className="text-xl font-bold text-ems-ink">Welcome, {profile?.name || "there"} 👋</h2>
      <p className="text-sm text-ems-muted mb-5">Here's your day at a glance.</p>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <div className={cardCls}>
          <p className="text-2xl font-bold text-ems-ink">{tasks.length}</p>
          <p className="text-xs text-ems-muted mt-1">Assigned tasks</p>
          <Link to="/employee/tasks" className="text-xs font-semibold text-ems-primary mt-2 inline-block">
            View tasks →
          </Link>
        </div>
        <div className={cardCls}>
          <p className="text-sm font-semibold text-ems-ink">
            {attendanceToday?.checkIn ? "Checked in" : "Not checked in"}
          </p>
          <p className="text-xs text-ems-muted mt-1">Today's attendance</p>
          <Link to="/employee/attendance" className="text-xs font-semibold text-ems-primary mt-2 inline-block">
            Go to attendance →
          </Link>
        </div>
        <div className={cardCls}>
          <p className="text-2xl font-bold text-ems-ink">{notifCount}</p>
          <p className="text-xs text-ems-muted mt-1">Unread notifications</p>
          <Link to="/employee/notifications" className="text-xs font-semibold text-ems-primary mt-2 inline-block">
            View all →
          </Link>
        </div>
      </div>

      <div className={cardCls}>
        <h3 className="text-sm font-semibold text-ems-ink mb-3">Your Recent Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-sm text-ems-muted">No tasks assigned yet.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li key={t._id} className="text-sm flex items-center justify-between border-b border-ems-border pb-2">
                <span>{t.title}</span>
                <StatusBadge value={t.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboardHome;
