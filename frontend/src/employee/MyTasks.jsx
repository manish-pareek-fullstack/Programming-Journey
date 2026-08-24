import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import Loader from "../Loader";
import { EmptyState, ErrorState, cardCls, StatusBadge, inputCls, btnPrimary } from "../lib/ui";

const STATUS_OPTIONS = ["todo", "in-progress", "review", "completed"];

const MyTasks = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [commentDrafts, setCommentDrafts] = useState({});

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const meRes = await api.get("/employees/me");
      const myId = meRes.data.data._id;
      setEmployeeId(myId);

      const res = await api.get("/tasks", {
        params: { assignedTo: myId, status: statusFilter || undefined, limit: 100 },
      });
      setTasks(res.data.data || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/tasks/${id}`, { status });
      load();
    } catch (err) {
      console.log("Failed to update task:", err);
    }
  };

  const submitComment = async (id) => {
    const text = (commentDrafts[id] || "").trim();
    if (!text) return;
    try {
      await api.post(`/tasks/${id}/comments`, { text });
      setCommentDrafts((d) => ({ ...d, [id]: "" }));
      load();
    } catch (err) {
      console.log("Failed to add comment:", err);
    }
  };

  if (loading) return <Loader fullPage={false} label="Loading your tasks" />;
  if (error) return <ErrorState />;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-ems-ink">My Tasks</h2>
          <p className="text-sm text-ems-muted">Tasks assigned to you across all projects.</p>
        </div>
        <select
          className={`${inputCls} w-auto`}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      {tasks.length === 0 ? (
        <EmptyState text="No tasks assigned to you yet." />
      ) : (
        <div className="grid gap-3">
          {tasks.map((t) => {
            const overdue = t.status !== "completed" && new Date(t.deadline) < new Date();
            return (
              <div key={t._id} className={cardCls}>
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-ems-ink">{t.title}</p>
                    {t.project?.name && (
                      <p className="text-xs text-ems-muted">Project: {t.project.name}</p>
                    )}
                    {t.description && (
                      <p className="text-sm text-ems-muted mt-1">{t.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge value={t.priority} />
                    {overdue ? <StatusBadge value="overdue" /> : <StatusBadge value={t.status} />}
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 mt-3">
                  <p className="text-xs text-ems-muted">
                    Deadline: {new Date(t.deadline).toLocaleDateString()}
                  </p>
                  <select
                    className={`${inputCls} w-auto text-xs py-1.5`}
                    value={t.status}
                    onChange={(e) => updateStatus(t._id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("-", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                {t.comments?.length > 0 && (
                  <div className="mt-3 border-t border-ems-border pt-2 space-y-1.5">
                    {t.comments.map((c, i) => (
                      <p key={i} className="text-xs text-ems-muted">
                        <span className="font-semibold text-ems-ink">{c.userName}:</span> {c.text}
                      </p>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <input
                    className={inputCls}
                    placeholder="Add a comment..."
                    value={commentDrafts[t._id] || ""}
                    onChange={(e) =>
                      setCommentDrafts((d) => ({ ...d, [t._id]: e.target.value }))
                    }
                  />
                  <button className={btnPrimary} onClick={() => submitComment(t._id)}>
                    Send
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
