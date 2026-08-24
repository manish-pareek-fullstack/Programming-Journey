import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import api from "../lib/api";
import Loader from "../Loader";
import {
  StatusBadge,
  EmptyState,
  ErrorState,
  inputCls,
  btnGhost,
  tableWrap,
  table,
  th,
  td,
} from "../lib/ui";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/leaves", { params: { status, page, limit: 10 } });
      setLeaves(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [status, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleReview = async (id, newStatus) => {
    const label = newStatus === "approved" ? "approve" : "reject";
    if (!window.confirm(`Are you sure you want to ${label} this leave request?`)) return;
    try {
      await api.patch(`/leaves/${id}/review`, { status: newStatus });
      toast.success(`Leave ${newStatus}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-ems-ink">Leave Requests</h2>
        <p className="text-sm text-ems-muted">Review and respond to employee leave applications.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          className={`${inputCls} max-w-[170px]`}
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <Loader fullPage={false} label="Loading leave requests" />
      ) : error ? (
        <ErrorState />
      ) : leaves.length === 0 ? (
        <EmptyState text="No leave requests found." />
      ) : (
        <>
          <div className={tableWrap}>
            <table className={table}>
              <thead>
                <tr>
                  <th className={th}>Employee</th>
                  <th className={th}>Type</th>
                  <th className={th}>Dates</th>
                  <th className={th}>Reason</th>
                  <th className={th}>Status</th>
                  <th className={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((l) => (
                  <tr key={l._id}>
                    <td className={`${td} font-semibold`}>{l.employee?.name || "-"}</td>
                    <td className={`${td} capitalize`}>{l.leaveType}</td>
                    <td className={td}>
                      {new Date(l.startDate).toLocaleDateString()} –{" "}
                      {new Date(l.endDate).toLocaleDateString()}
                    </td>
                    <td className={`${td} max-w-xs truncate`} title={l.reason}>
                      {l.reason}
                    </td>
                    <td className={td}>
                      <StatusBadge value={l.status} />
                    </td>
                    <td className={td}>
                      {l.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition"
                            onClick={() => handleReview(l._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition"
                            onClick={() => handleReview(l._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-ems-muted">Reviewed</span>
                      )}
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

export default LeaveManagement;
