import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import Loader from "../Loader";
import {
  EmptyState,
  ErrorState,
  inputCls,
  btnGhost,
  tableWrap,
  table,
  th,
  td,
} from "../lib/ui";

const MODULES = ["Employee", "Department", "Project", "Task", "Leave"];

const ACTION_COLOR = {
  created: "bg-emerald-100 text-emerald-700",
  updated: "bg-blue-100 text-blue-700",
  deleted: "bg-rose-100 text-rose-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  applied: "bg-amber-100 text-amber-700",
};

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [module, setModule] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/audit-logs", { params: { module, page, limit: 15 } });
      setLogs(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [module, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-ems-ink">Audit Logs</h2>
        <p className="text-sm text-ems-muted">A record of every important change made in the system.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          className={`${inputCls} max-w-[180px]`}
          value={module}
          onChange={(e) => {
            setPage(1);
            setModule(e.target.value);
          }}
        >
          <option value="">All Modules</option>
          {MODULES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader fullPage={false} label="Loading audit logs" />
      ) : error ? (
        <ErrorState />
      ) : logs.length === 0 ? (
        <EmptyState text="No activity recorded yet." />
      ) : (
        <>
          <div className={tableWrap}>
            <table className={table}>
              <thead>
                <tr>
                  <th className={th}>When</th>
                  <th className={th}>User</th>
                  <th className={th}>Module</th>
                  <th className={th}>Action</th>
                  <th className={th}>Description</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td className={td}>{new Date(log.createdAt).toLocaleString()}</td>
                    <td className={td}>{log.userName}</td>
                    <td className={td}>{log.module}</td>
                    <td className={td}>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          ACTION_COLOR[log.action] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className={td}>{log.description}</td>
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

export default AuditLogs;
