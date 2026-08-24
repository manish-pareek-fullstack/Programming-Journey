import React from "react";

const KPICard = ({ label, value, accent = "ems-primary" }) => (
  <div className="bg-white rounded-2xl border border-ems-border shadow-sm p-4 flex-1 min-w-[150px]">
    <p className="text-2xl font-bold text-ems-ink">{value}</p>
    <p className="text-xs text-ems-muted mt-1">{label}</p>
  </div>
);

export default KPICard;
