import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import Loader from "../Loader";
import { EmptyState, ErrorState, cardCls, StatusBadge, btnPrimary } from "../lib/ui";
import { toast } from "react-toastify";

const MyAttendance = () => {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [acting, setActing] = useState(false);

  const today = new Date();
  const todaysRecord = records.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/attendance/me", {
        params: { month: today.getMonth() + 1, year: today.getFullYear() },
      });
      setRecords(res.data.data || []);
      setSummary(res.data.summary || null);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCheckIn = async () => {
    try {
      setActing(true);
      await api.post("/attendance/check-in");
      toast.success("Checked in successfully");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Check-in failed");
    } finally {
      setActing(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setActing(true);
      await api.post("/attendance/check-out");
      toast.success("Checked out successfully");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Check-out failed");
    } finally {
      setActing(false);
    }
  };

  if (loading) return <Loader fullPage={false} label="Loading attendance" />;
  if (error) return <ErrorState />;

  return (
    <div>
      <h2 className="text-xl font-bold text-ems-ink">Attendance</h2>
      <p className="text-sm text-ems-muted mb-5">Check in, check out and track your monthly attendance.</p>

      <div className={`${cardCls} flex items-center justify-between flex-wrap gap-4 mb-6`}>
        <div>
          <p className="text-sm text-ems-muted">Today, {today.toLocaleDateString()}</p>
          <p className="font-semibold text-ems-ink mt-1">
            {todaysRecord?.checkIn
              ? `Checked in at ${new Date(todaysRecord.checkIn).toLocaleTimeString()}`
              : "Not checked in yet"}
            {todaysRecord?.checkOut &&
              ` · Checked out at ${new Date(todaysRecord.checkOut).toLocaleTimeString()}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className={btnPrimary}
            disabled={acting || !!todaysRecord?.checkIn}
            onClick={handleCheckIn}
          >
            Check In
          </button>
          <button
            className={btnPrimary}
            disabled={acting || !todaysRecord?.checkIn || !!todaysRecord?.checkOut}
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[
            ["Present", summary.present],
            ["Late", summary.late],
            ["Half-day", summary["half-day"]],
            ["Absent", summary.absent],
            ["Total Hours", summary.totalHours?.toFixed?.(1) ?? summary.totalHours],
          ].map(([label, value]) => (
            <div key={label} className={cardCls}>
              <p className="text-xl font-bold text-ems-ink">{value ?? 0}</p>
              <p className="text-xs text-ems-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-sm font-semibold text-ems-ink mb-3">This Month's History</h3>
      {records.length === 0 ? (
        <EmptyState text="No attendance records yet this month." />
      ) : (
        <div className="grid gap-2">
          {records.map((r) => (
            <div key={r._id} className={`${cardCls} flex items-center justify-between`}>
              <div>
                <p className="text-sm font-semibold text-ems-ink">
                  {new Date(r.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-ems-muted">
                  {r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-"} →{" "}
                  {r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : "-"}
                  {r.workingHours ? ` · ${r.workingHours}h` : ""}
                </p>
              </div>
              <StatusBadge value={r.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAttendance;
