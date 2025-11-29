import React from "react";
import { Trash2 } from "lucide-react";

export default function EmployeeTiles({
  employees,
  currentUser,
  onSelect,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((emp) => (
        <div
          key={emp.id}
          onClick={() => onSelect(emp)}
          className="group relative bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-indigo-50 to-violet-50 opacity-50" />
          <div className="relative flex justify-between items-start">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-xl font-bold text-indigo-600 mb-4">
              {emp.name.charAt(0)}
            </div>
            {currentUser.role === "ADMIN" && (
              <button
                className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors z-10"
                onClick={(e) => onDelete(emp.id, e)}
                title="Delete Employee"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="mt-2">
            <h3 className="font-bold text-lg text-gray-900">{emp.name}</h3>
            <p className="text-sm text-indigo-500 font-medium mb-4">
              {emp.role}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  emp.status === "Present"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {emp.status || "N/A"}
              </span>
              <span>• {emp.attendance}% Att.</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
