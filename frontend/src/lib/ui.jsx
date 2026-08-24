import React from "react";

// Consistent color-coded status pill used across Projects, Tasks,
// Attendance, Leaves and Work Reports.
const COLOR_MAP = {
  // task / project status
  todo: "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-100 text-blue-700",
  review: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
  planning: "bg-slate-100 text-slate-600",
  active: "bg-blue-100 text-blue-700",
  "on-hold": "bg-amber-100 text-amber-700",

  // priority
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",

  // attendance
  present: "bg-emerald-100 text-emerald-700",
  absent: "bg-rose-100 text-rose-700",
  late: "bg-amber-100 text-amber-700",
  "half-day": "bg-blue-100 text-blue-700",

  // leave / review
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  reviewed: "bg-emerald-100 text-emerald-700",

  overdue: "bg-rose-100 text-rose-700",
};

export const StatusBadge = ({ value }) => {
  const cls = COLOR_MAP[value] || "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${cls}`}
    >
      {value?.replace("-", " ") || "-"}
    </span>
  );
};

export const EmptyState = ({ text = "Nothing here yet." }) => (
  <div className="text-center py-10 text-ems-muted text-sm">{text}</div>
);

export const ErrorState = ({ text = "Something went wrong. Please try again." }) => (
  <div className="text-center py-10 text-rose-500 text-sm">{text}</div>
);

// Shared Tailwind class snippets so every new page looks consistent
export const cardCls =
  "bg-white rounded-2xl border border-ems-border shadow-sm p-5";
export const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-ems-border bg-white text-sm text-ems-ink focus:outline-none focus:ring-2 focus:ring-ems-primary/25 focus:border-ems-primary transition";
export const btnPrimary =
  "px-4 py-2.5 rounded-lg bg-ems-primary text-white text-sm font-semibold hover:bg-ems-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed";
export const btnGhost =
  "px-3 py-2 rounded-lg border border-ems-border text-ems-ink text-sm font-medium hover:bg-ems-bg transition";
export const btnDanger =
  "px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition";
export const btnEdit =
  "px-3 py-1.5 rounded-lg bg-ems-primary-soft/30 text-ems-primary-dark text-xs font-semibold hover:bg-ems-primary-soft/50 transition";
export const tableWrap = "overflow-x-auto rounded-xl border border-ems-border";
export const table = "w-full text-sm";
export const th = "text-left px-4 py-3 bg-ems-bg text-ems-muted font-semibold text-xs uppercase tracking-wide";
export const td = "px-4 py-3 border-t border-ems-border text-ems-ink";
