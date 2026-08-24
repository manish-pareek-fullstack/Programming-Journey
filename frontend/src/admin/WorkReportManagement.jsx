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
} from "../lib/ui";

const WorkReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [commentDraft, setCommentDraft] = useState({});

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/work-reports", {
        params: { reviewStatus, page, limit: 8 },
      });
      setReports(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [reviewStatus, page]);

  useEffect(() => {
    load();
  }, [load]);

  const submitReview = async (id) => {
    try {
      await api.patch(`/work-reports/${id}/review`, {
        managerComments: commentDraft[id] || "",
      });
      toast.success("Report reviewed");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Review failed");
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-ems-ink">Daily Work Reports</h2>
        <p className="text-sm text-ems-muted">Review what the team worked on each day.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          className={`${inputCls} max-w-[170px]`}
          value={reviewStatus}
          onChange={(e) => {
            setPage(1);
            setReviewStatus(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending Review</option>
          <option value="reviewed">Reviewed</option>
        </select>
      </div>

      {loading ? (
        <Loader fullPage={false} label="Loading work reports" />
      ) : error ? (
        <ErrorState />
      ) : reports.length === 0 ? (
        <EmptyState text="No work reports submitted yet." />
      ) : (
        <>
          <div className="grid gap-4">
            {reports.map((r) => (
              <div key={r._id} className={cardCls}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-ems-ink">{r.employee?.name || "-"}</p>
                    <p className="text-xs text-ems-muted">
                      {new Date(r.date).toLocaleDateString()} · {r.hoursWorked}h worked
                    </p>
                  </div>
                  <StatusBadge value={r.reviewStatus} />
                </div>

                <p className="text-sm text-ems-ink mb-1">
                  <strong>Completed:</strong> {r.completedWork}
                </p>
                {r.blockers && (
                  <p className="text-sm text-ems-muted mb-1">
                    <strong>Blockers:</strong> {r.blockers}
                  </p>
                )}
                {r.nextDayPlan && (
                  <p className="text-sm text-ems-muted mb-1">
                    <strong>Next day plan:</strong> {r.nextDayPlan}
                  </p>
                )}

                {r.reviewStatus === "reviewed" ? (
                  r.managerComments && (
                    <p className="text-sm text-ems-primary-dark bg-ems-primary-soft/10 rounded-lg px-3 py-2 mt-2">
                      <strong>Manager comment:</strong> {r.managerComments}
                    </p>
                  )
                ) : (
                  <div className="flex gap-2 mt-3">
                    <input
                      className={inputCls}
                      placeholder="Add a manager comment (optional)"
                      value={commentDraft[r._id] || ""}
                      onChange={(e) =>
                        setCommentDraft({ ...commentDraft, [r._id]: e.target.value })
                      }
                    />
                    <button className={btnPrimary} onClick={() => submitReview(r._id)}>
                      Mark Reviewed
                    </button>
                  </div>
                )}
              </div>
            ))}
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

export default WorkReportManagement;
