import React, { useEffect, useState, useCallback } from "react";
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

const AttendanceManagement = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/attendance", {
        params: { status, month, year, page, limit: 10 },
      });
      setRecords(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [status, month, year, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-ems-ink">Attendance</h2>
        <p className="text-sm text-ems-muted">Company-wide check-in / check-out records.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          className={`${inputCls} max-w-[150px]`}
          value={month}
          onChange={(e) => {
            setPage(1);
            setMonth(Number(e.target.value));
          }}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {new Date(0, m - 1).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          className={`${inputCls} max-w-[110px]`}
          value={year}
          onChange={(e) => {
            setPage(1);
            setYear(Number(e.target.value));
          }}
        />
        <select
          className={`${inputCls} max-w-[160px]`}
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="late">Late</option>
          <option value="half-day">Half Day</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      {loading ? (
        <Loader fullPage={false} label="Loading attendance" />
      ) : error ? (
        <ErrorState />
      ) : records.length === 0 ? (
        <EmptyState text="No attendance records for this period." />
      ) : (
        <>
          <div className={tableWrap}>
            <table className={table}>
              <thead>
                <tr>
                  <th className={th}>Employee</th>
                  <th className={th}>Date</th>
                  <th className={th}>Check In</th>
                  <th className={th}>Check Out</th>
                  <th className={th}>Hours</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r._id}>
                    <td className={`${td} font-semibold`}>{r.employee?.name || "-"}</td>
                    <td className={td}>{new Date(r.date).toLocaleDateString()}</td>
                    <td className={td}>
                      {r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-"}
                    </td>
                    <td className={td}>
                      {r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : "-"}
                    </td>
                    <td className={td}>{r.workingHours || 0}h</td>
                    <td className={td}>
                      <StatusBadge value={r.status} />
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

export default AttendanceManagement;
