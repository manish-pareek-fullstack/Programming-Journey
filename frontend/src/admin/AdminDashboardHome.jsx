import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import api from "../lib/api";
import Loader from "../Loader";
import { cardCls, StatusBadge, ErrorState } from "../lib/ui";
import KPICard from "./KPICard";

const PIE_COLORS = ["#6d4fe0", "#f5a524", "#10b981", "#ef4444", "#3b82f6", "#94a3b8"];

const AdminDashboardHome = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [profileRes, statsRes, activityRes] = await Promise.all([
          api.get("/profile"),
          api.get("/analytics/dashboard"),
          api.get("/analytics/recent-activity"),
        ]);

        setProfile(profileRes.data.user);
        setStats(statsRes.data.data);
        setActivity(activityRes.data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loader fullPage={false} label="Loading dashboard" />;
  if (error || !stats) return <ErrorState />;

  const { cards, charts } = stats;

  return (
    <div>
      <h2 className="text-xl font-bold text-ems-ink">Welcome, {profile?.name || "Admin"} 👋</h2>
      <p className="text-sm text-ems-muted mb-5">
        Here's what's happening across the company today.
      </p>

      {/* KPI cards - real MongoDB counts */}
      <div className="flex flex-wrap gap-3 mb-6">
        <KPICard label="Total Employees" value={cards.totalEmployees} />
        <KPICard label="Active Employees" value={cards.activeEmployees} />
        <KPICard label="Inactive Employees" value={cards.inactiveEmployees} />
        <KPICard label="Departments" value={cards.totalDepartments} />
        <KPICard label="Projects" value={cards.totalProjects} />
        <KPICard label="Total Tasks" value={cards.totalTasks} />
        <KPICard label="Completed Tasks" value={cards.completedTasks} />
        <KPICard label="Pending Leaves" value={cards.pendingLeaves} />
        <KPICard label="Checked In Today" value={cards.todayAttendance} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className={cardCls}>
          <h3 className="text-sm font-semibold text-ems-ink mb-3">Tasks by Status</h3>
          {charts.tasksByStatus.length === 0 ? (
            <p className="text-sm text-ems-muted py-8 text-center">No tasks yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={charts.tasksByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6d4fe0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={cardCls}>
          <h3 className="text-sm font-semibold text-ems-ink mb-3">Employees by Department</h3>
          {charts.employeesByDepartment.length === 0 ? (
            <p className="text-sm text-ems-muted py-8 text-center">No employees yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={charts.employeesByDepartment}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => entry.name}
                >
                  {charts.employeesByDepartment.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={cardCls}>
          <h3 className="text-sm font-semibold text-ems-ink mb-3">Attendance (This Period)</h3>
          {charts.attendanceByStatus.length === 0 ? (
            <p className="text-sm text-ems-muted py-8 text-center">No attendance records yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={charts.attendanceByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={cardCls}>
          <h3 className="text-sm font-semibold text-ems-ink mb-3">Leaves by Status</h3>
          {charts.leavesByStatus.length === 0 ? (
            <p className="text-sm text-ems-muted py-8 text-center">No leave requests yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={charts.leavesByStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => entry.name}
                >
                  {charts.leavesByStatus.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Pending actions */}
      {activity && (
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className={`${cardCls} border-amber-200 bg-amber-50/40`}>
            <p className="text-2xl font-bold text-amber-600">
              {activity.pendingActions.pendingLeaves}
            </p>
            <p className="text-sm text-ems-muted">Pending leave approvals</p>
            <Link to="/admin/leaves" className="text-xs font-semibold text-ems-primary mt-2 inline-block">
              Review now →
            </Link>
          </div>
          <div className={`${cardCls} border-rose-200 bg-rose-50/40`}>
            <p className="text-2xl font-bold text-rose-600">{activity.pendingActions.overdueTasks}</p>
            <p className="text-sm text-ems-muted">Overdue tasks</p>
            <Link to="/admin/tasks" className="text-xs font-semibold text-ems-primary mt-2 inline-block">
              View tasks →
            </Link>
          </div>
        </div>
      )}

      {/* Recent activity */}
      {activity && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className={cardCls}>
            <h3 className="text-sm font-semibold text-ems-ink mb-3">Recent Employees</h3>
            {activity.recentEmployees.length === 0 ? (
              <p className="text-sm text-ems-muted">No employees yet</p>
            ) : (
              <ul className="space-y-2">
                {activity.recentEmployees.map((e) => (
                  <li key={e._id} className="text-sm flex justify-between border-b border-ems-border pb-2">
                    <span>{e.name}</span>
                    <span className="text-ems-muted text-xs">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={cardCls}>
            <h3 className="text-sm font-semibold text-ems-ink mb-3">Recent Tasks</h3>
            {activity.recentTasks.length === 0 ? (
              <p className="text-sm text-ems-muted">No tasks yet</p>
            ) : (
              <ul className="space-y-2">
                {activity.recentTasks.map((t) => (
                  <li key={t._id} className="text-sm flex items-center justify-between border-b border-ems-border pb-2">
                    <span>
                      {t.title} <span className="text-ems-muted text-xs">({t.assignedTo?.name})</span>
                    </span>
                    <StatusBadge value={t.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={cardCls}>
            <h3 className="text-sm font-semibold text-ems-ink mb-3">Recent Projects</h3>
            {activity.recentProjects.length === 0 ? (
              <p className="text-sm text-ems-muted">No projects yet</p>
            ) : (
              <ul className="space-y-2">
                {activity.recentProjects.map((p) => (
                  <li key={p._id} className="text-sm flex items-center justify-between border-b border-ems-border pb-2">
                    <span>{p.name}</span>
                    <StatusBadge value={p.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={cardCls}>
            <h3 className="text-sm font-semibold text-ems-ink mb-3">Recent Leaves</h3>
            {activity.recentLeaves.length === 0 ? (
              <p className="text-sm text-ems-muted">No leave requests yet</p>
            ) : (
              <ul className="space-y-2">
                {activity.recentLeaves.map((l) => (
                  <li key={l._id} className="text-sm flex items-center justify-between border-b border-ems-border pb-2">
                    <span>{l.employee?.name}</span>
                    <StatusBadge value={l.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardHome;
