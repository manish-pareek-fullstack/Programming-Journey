import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import Loader from "../Loader";
import { EmptyState, ErrorState, cardCls, StatusBadge, inputCls, btnPrimary } from "../lib/ui";
import { toast } from "react-toastify";

const LEAVE_TYPES = ["casual", "sick", "paid", "unpaid", "other"];

const emptyForm = { leaveType: "casual", startDate: "", endDate: "", reason: "" };

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/leaves/me");
      setLeaves(res.data.data || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate || !form.reason.trim()) {
      toast.error("Please fill start date, end date and reason");
      return;
    }
    try {
      setSubmitting(true);
      await api.post("/leaves", form);
      toast.success("Leave application submitted");
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply for leave");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-ems-ink">My Leaves</h2>
      <p className="text-sm text-ems-muted mb-5">Apply for leave and track approval status.</p>

      <form onSubmit={handleSubmit} className={`${cardCls} mb-6 grid sm:grid-cols-2 gap-3`}>
        <select
          className={inputCls}
          value={form.leaveType}
          onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
        >
          {LEAVE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <div />
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
        <textarea
          className={`${inputCls} sm:col-span-2`}
          rows={3}
          placeholder="Reason for leave"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        <button className={`${btnPrimary} sm:col-span-2 justify-self-start`} disabled={submitting}>
          {submitting ? "Submitting..." : "Apply for Leave"}
        </button>
      </form>

      <h3 className="text-sm font-semibold text-ems-ink mb-3">Leave History</h3>
      {loading ? (
        <Loader fullPage={false} label="Loading leaves" />
      ) : error ? (
        <ErrorState />
      ) : leaves.length === 0 ? (
        <EmptyState text="You haven't applied for any leave yet." />
      ) : (
        <div className="grid gap-2">
          {leaves.map((l) => (
            <div key={l._id} className={`${cardCls} flex items-start justify-between gap-3`}>
              <div>
                <p className="text-sm font-semibold text-ems-ink capitalize">{l.leaveType} leave</p>
                <p className="text-xs text-ems-muted">
                  {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-ems-muted mt-1">{l.reason}</p>
                {l.reviewComment && (
                  <p className="text-xs text-ems-muted mt-1">
                    <span className="font-semibold">Admin note:</span> {l.reviewComment}
                  </p>
                )}
              </div>
              <StatusBadge value={l.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLeaves;
