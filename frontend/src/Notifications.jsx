import React, { useEffect, useState, useCallback } from "react";
import api from "./lib/api";
import Loader from "./Loader";
import { EmptyState, ErrorState, cardCls, btnGhost } from "./lib/ui";

const ICONS = {
  "task-assigned": "📋",
  "leave-status": "🗓️",
  "work-report": "📝",
  "upcoming-task": "⏰",
  "overdue-task": "⚠️",
  general: "🔔",
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/notifications", { params: { limit: 50 } });
      setNotifications(res.data.data || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markOne = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      load();
    } catch (err) {
      console.log("Failed to mark as read:", err);
    }
  };

  const markAll = async () => {
    try {
      await api.patch("/notifications/read-all");
      load();
    } catch (err) {
      console.log("Failed to mark all as read:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-ems-ink">
            Notifications{" "}
            {unreadCount > 0 && (
              <span className="ml-1 text-sm font-semibold text-white bg-ems-primary rounded-full px-2.5 py-0.5 align-middle">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-sm text-ems-muted">Stay on top of tasks, leaves and reports.</p>
        </div>
        {unreadCount > 0 && (
          <button className={btnGhost} onClick={markAll}>
            Mark all as read
          </button>
        )}
      </div>

      {loading ? (
        <Loader fullPage={false} label="Loading notifications" />
      ) : error ? (
        <ErrorState />
      ) : notifications.length === 0 ? (
        <EmptyState text="You're all caught up — no notifications." />
      ) : (
        <div className="grid gap-2">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => !n.isRead && markOne(n._id)}
              className={`${cardCls} flex items-start gap-3 cursor-pointer transition ${
                n.isRead ? "opacity-70" : "border-ems-primary/40 bg-ems-primary-soft/5"
              }`}
            >
              <span className="text-xl">{ICONS[n.type] || "🔔"}</span>
              <div className="flex-1">
                <p className="font-semibold text-ems-ink text-sm">{n.title}</p>
                <p className="text-sm text-ems-muted">{n.message}</p>
                <p className="text-xs text-ems-muted mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {!n.isRead && <span className="w-2 h-2 rounded-full bg-ems-primary mt-1" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
