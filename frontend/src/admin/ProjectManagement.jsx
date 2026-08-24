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
  btnEdit,
  tableWrap,
  table,
  th,
  td,
} from "../lib/ui";

const emptyForm = {
  name: "",
  description: "",
  manager: "",
  teamMembers: [],
  status: "planning",
  priority: "medium",
  startDate: "",
  endDate: "",
};

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadEmployees = useCallback(async () => {
    try {
      const res = await api.get("/employees", { params: { limit: 200, status: "active" } });
      setEmployees(res.data.data || []);
    } catch (err) {
      console.log("Failed to load employees:", err);
    }
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/projects", {
        params: { search, status, page, limit: 8 },
      });
      setProjects(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [search, status, page]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      manager: p.manager?._id || "",
      teamMembers: (p.teamMembers || []).map((m) => m._id),
      status: p.status || "planning",
      priority: p.priority || "medium",
      startDate: p.startDate ? p.startDate.slice(0, 10) : "",
      endDate: p.endDate ? p.endDate.slice(0, 10) : "",
    });
    setShowForm(true);
  };

  const handleTeamToggle = (id) => {
    setForm((f) => ({
      ...f,
      teamMembers: f.teamMembers.includes(id)
        ? f.teamMembers.filter((m) => m !== id)
        : [...f.teamMembers, id],
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.name || !form.manager || !form.startDate) {
      toast.error("Name, manager and start date are required");
      return;
    }
    try {
      setSaving(true);
      if (editingId) {
        await api.patch(`/projects/${editingId}`, form);
        toast.success("Project updated");
      } else {
        await api.post("/projects", form);
        toast.success("Project created");
      }
      setShowForm(false);
      loadProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project? This also removes its tasks.")) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted");
      loadProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-ems-ink">Projects</h2>
          <p className="text-sm text-ems-muted">Create and track every project across the company.</p>
        </div>
        <button className={btnPrimary} onClick={openCreate}>
          + New Project
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className={`${inputCls} max-w-xs`}
          placeholder="Search projects..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          className={`${inputCls} max-w-[180px]`}
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="on-hold">On Hold</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {showForm && (
        <div className={`${cardCls} mb-5`}>
          <form onSubmit={submitForm} className="grid sm:grid-cols-2 gap-3">
            <input
              className={inputCls}
              placeholder="Project name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              className={inputCls}
              value={form.manager}
              onChange={(e) => setForm({ ...form, manager: e.target.value })}
            >
              <option value="">Select manager</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
            <textarea
              className={`${inputCls} sm:col-span-2`}
              placeholder="Description"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <select
              className={inputCls}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className={inputCls}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <input
              type="date"
              className={inputCls}
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
            <input
              type="date"
              className={inputCls}
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />

            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-ems-muted mb-2">Team members</p>
              <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
                {employees.map((emp) => (
                  <label
                    key={emp._id}
                    className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer transition ${
                      form.teamMembers.includes(emp._id)
                        ? "bg-ems-primary text-white border-ems-primary"
                        : "border-ems-border text-ems-muted"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={form.teamMembers.includes(emp._id)}
                      onChange={() => handleTeamToggle(emp._id)}
                    />
                    {emp.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2 flex gap-2 mt-2">
              <button type="submit" className={btnPrimary} disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
              </button>
              <button type="button" className={btnGhost} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <Loader fullPage={false} label="Loading projects" />
      ) : error ? (
        <ErrorState />
      ) : projects.length === 0 ? (
        <EmptyState text="No projects yet. Create your first one." />
      ) : (
        <>
          <div className={tableWrap}>
            <table className={table}>
              <thead>
                <tr>
                  <th className={th}>Name</th>
                  <th className={th}>Manager</th>
                  <th className={th}>Team</th>
                  <th className={th}>Priority</th>
                  <th className={th}>Status</th>
                  <th className={th}>Dates</th>
                  <th className={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id}>
                    <td className={`${td} font-semibold`}>{p.name}</td>
                    <td className={td}>{p.manager?.name || "-"}</td>
                    <td className={td}>{p.teamMembers?.length || 0} members</td>
                    <td className={td}>
                      <StatusBadge value={p.priority} />
                    </td>
                    <td className={td}>
                      <StatusBadge value={p.status} />
                    </td>
                    <td className={td}>
                      {p.startDate ? new Date(p.startDate).toLocaleDateString() : "-"}
                      {p.endDate ? ` – ${new Date(p.endDate).toLocaleDateString()}` : ""}
                    </td>
                    <td className={td}>
                      <div className="flex gap-2">
                        <button className={btnEdit} onClick={() => openEdit(p)}>
                          Edit
                        </button>
                        <button className={btnDanger} onClick={() => handleDelete(p._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              className={btnGhost}
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
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

export default ProjectManagement;
