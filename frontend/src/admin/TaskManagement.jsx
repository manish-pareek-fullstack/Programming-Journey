import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import api from "../lib/api";
import Loader from "../Loader";
import {
  StatusBadge,
  EmptyState,
  ErrorState,
  cardCls,
  inputCls,
  btnPrimary,
  btnGhost,
  btnDanger,
  tableWrap,
  table,
  th,
  td,
} from "../lib/ui";

const emptyForm = {
  title: "",
  description: "",
  project: "",
  assignedTo: "",
  priority: "medium",
  deadline: "",
  status: "todo",
};

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadDropdowns = useCallback(async () => {
    try {
      const [empRes, projRes] = await Promise.all([
        api.get("/employees", { params: { limit: 200, status: "active" } }),
        api.get("/projects", { params: { limit: 100 } }),
      ]);
      setEmployees(empRes.data.data || []);
      setProjects(projRes.data.data || []);
    } catch (err) {
      console.log("Failed to load dropdown data:", err);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/tasks", {
        params: { search, status, priority, page, limit: 8 },
      });
      setTasks(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, page]);

  useEffect(() => {
    loadDropdowns();
  }, [loadDropdowns]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo || !form.deadline) {
      toast.error("Title, assignee and deadline are required");
      return;
    }
    try {
      setSaving(true);
      await api.post("/tasks", form);
      toast.success("Task created and assigned");
      setForm(emptyForm);
      setShowForm(false);
      loadTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/tasks/${id}`, { status: newStatus });
      toast.success("Task status updated");
      loadTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      loadTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const isOverdue = (t) => t.status !== "completed" && new Date(t.deadline) < new Date();

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-ems-ink">Tasks</h2>
          <p className="text-sm text-ems-muted">Assign work and track progress in real time.</p>
        </div>
        <button className={btnPrimary} onClick={() => setShowForm((s) => !s)}>
          + New Task
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className={`${inputCls} max-w-xs`}
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          className={`${inputCls} max-w-[170px]`}
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className={`${inputCls} max-w-[170px]`}
          value={priority}
          onChange={(e) => {
            setPage(1);
            setPriority(e.target.value);
          }}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {showForm && (
        <div className={`${cardCls} mb-5`}>
          <form onSubmit={submitForm} className="grid sm:grid-cols-2 gap-3">
            <input
              className={inputCls}
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <select
              className={inputCls}
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            >
              <option value="">Assign to employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
            <select
              className={inputCls}
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
            >
              <option value="">No project (standalone task)</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              className={inputCls}
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
            <select
              className={inputCls}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <textarea
              className={`${inputCls} sm:col-span-2`}
              placeholder="Description"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" className={btnPrimary} disabled={saving}>
                {saving ? "Saving..." : "Create Task"}
              </button>
              <button type="button" className={btnGhost} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <Loader fullPage={false} label="Loading tasks" />
      ) : error ? (
        <ErrorState />
      ) : tasks.length === 0 ? (
        <EmptyState text="No tasks yet. Create one to get started." />
      ) : (
        <>
          <div className={tableWrap}>
            <table className={table}>
              <thead>
                <tr>
                  <th className={th}>Title</th>
                  <th className={th}>Assigned To</th>
                  <th className={th}>Project</th>
                  <th className={th}>Priority</th>
                  <th className={th}>Deadline</th>
                  <th className={th}>Status</th>
                  <th className={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t._id}>
                    <td className={`${td} font-semibold`}>{t.title}</td>
                    <td className={td}>{t.assignedTo?.name || "-"}</td>
                    <td className={td}>{t.project?.name || "-"}</td>
                    <td className={td}>
                      <StatusBadge value={t.priority} />
                    </td>
                    <td className={td}>
                      {new Date(t.deadline).toLocaleDateString()}
                      {isOverdue(t) && (
                        <span className="ml-2">
                          <StatusBadge value="overdue" />
                        </span>
                      )}
                    </td>
                    <td className={td}>
                      <select
                        className="text-xs rounded-full border border-ems-border px-2 py-1 capitalize"
                        value={t.status}
                        onChange={(e) => handleStatusChange(t._id, e.target.value)}
                      >
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className={td}>
                      <button className={btnDanger} onClick={() => handleDelete(t._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button className={btnGhost} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            <span className="text-sm text-ems-muted">
              Page {page} of {totalPages}
            </span>
            <button
              className={btnGhost}
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManagement;
