import React from "react";

export function Section({ title, children }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
      <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-3">{children}</div>
    </div>
  );
}

export function Field({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-200 pb-2 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
