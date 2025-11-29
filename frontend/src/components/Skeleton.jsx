import React from "react";

export function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-pulse"
        >
          {/* Cover Area */}
          <div className="h-24 bg-slate-100 rounded-t-xl mb-4 -mx-6 -mt-6"></div>

          {/* Avatar & Action */}
          <div className="flex justify-between items-start relative">
            <div className="w-16 h-16 rounded-full bg-slate-200 border-4 border-white -mt-12"></div>
            <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
          </div>

          {/* Text Lines */}
          <div className="mt-4 space-y-3">
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            <div className="flex gap-3 mt-4">
              <div className="h-5 bg-slate-100 rounded-full w-16"></div>
              <div className="h-5 bg-slate-100 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 p-4 flex gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded w-full"></div>
        ))}
      </div>
      {/* Rows */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="p-4 border-b border-gray-100 flex items-center gap-4"
        >
          <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
          <div className="h-4 bg-slate-100 rounded w-1/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/6"></div>
          <div className="h-4 bg-slate-100 rounded w-1/6"></div>
          <div className="h-4 bg-slate-100 rounded w-1/6"></div>
          <div className="h-4 bg-slate-100 rounded w-1/12"></div>
        </div>
      ))}
    </div>
  );
}
