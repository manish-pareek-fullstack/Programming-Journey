import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import Loader from "../Loader";
import { EmptyState, ErrorState, cardCls, StatusBadge, inputCls, btnPrimary } from "../lib/ui";
import { toast } from "react-toastify";

const todayISO = () => new Date().toISOString().slice(0, 10);

const emptyForm = {
  date: todayISO(),
  hoursWorked: "",
  completedWork: "",
  blockers: "",
  nextDayPlan: "",
};

const MyWorkReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/work-reports/me");
      setReports(res.data.data || []);
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
    if (!form.hoursWorked || !form.completedWork.trim()) {
      toast.error("Please fill hours worked and completed work");
      return;
    }
    try {
      setSubmitting(true);
      await api.post("/work-reports", { ...form, hoursWorked: Number(form.hoursWorked) });
      toast.success("Work report submitted");
      setForm({ ...emptyForm, date: todayISO() });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-ems-ink">Daily Work Reports</h2>
      <p className="text-sm text-ems-muted mb-5">Log what you worked on each day.</p>

      <form onSubmit={handleSubmit} className={`${cardCls} mb-6 grid sm:grid-cols-2 gap-3`}>
        <input
          type="date"
          className={inputCls}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="number"
          step="0.5"
          min="0"
          className={inputCls}
          placeholder="Hours worked"
          value={form.hoursWorked}
          onChange={(e) => setForm({ ...form, hoursWorked: e.target.value })}
        />
        <textarea
          className={`${inputCls} sm:col-span-2`}
          rows={2}
          placeholder="Completed work"
          value={form.completedWork}
          onChange={(e) => setForm({ ...form, completedWork: e.target.value })}
        />
        <textarea
          className={inputCls}
          rows={2}
          placeholder="Blockers (if any)"
          value={form.blockers}
          onChange={(e) => setForm({ ...form, blockers: e.target.value })}
        />
        <textarea
          className={inputCls}
          rows={2}
          placeholder="Next day plan"
          value={form.nextDayPlan}
          onChange={(e) => setForm({ ...form, nextDayPlan: e.target.value })}
        />
        <button className={`${btnPrimary} sm:col-span-2 justify-self-start`} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      <h3 className="text-sm font-semibold text-ems-ink mb-3">Report History</h3>
      {loading ? (
        <Loader fullPage={false} label="Loading reports" />
      ) : error ? (
        <ErrorState />
      ) : reports.length === 0 ? (
        <EmptyState text="No work reports submitted yet." />
      ) : (
        <div className="grid gap-2">
          {reports.map((r) => (
            <div key={r._id} className={cardCls}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ems-ink">
                    {new Date(r.date).toLocaleDateString()} · {r.hoursWorked}h
                  </p>
                  <p className="text-sm text-ems-muted mt-1">{r.completedWork}</p>
                  {r.blockers && (
                    <p className="text-xs text-ems-muted mt-1">
                      <span className="font-semibold">Blockers:</span> {r.blockers}
                    </p>
                  )}
                  {r.managerComments && (
                    <p className="text-xs text-ems-muted mt-1">
                      <span className="font-semibold">Manager:</span> {r.managerComments}
                    </p>
                  )}
                </div>
                <StatusBadge value={r.reviewStatus} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWorkReports;
