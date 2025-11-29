import React from "react";
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const SortIcon = ({ field, currentSort, currentOrder }) => {
  if (currentSort !== field)
    return (
      <ArrowUpDown className="w-3 h-3 text-gray-300 ml-1 opacity-0 group-hover:opacity-50" />
    );
  return currentOrder === "asc" ? (
    <ArrowUp className="w-3 h-3 text-indigo-600 ml-1" />
  ) : (
    <ArrowDown className="w-3 h-3 text-indigo-600 ml-1" />
  );
};

const HeaderCell = ({ field, label, onSort, currentSort, currentOrder }) => (
  <th
    className="p-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
    onClick={() => onSort(field)}
  >
    <div className="flex items-center">
      {label}
      <SortIcon
        field={field}
        currentSort={currentSort}
        currentOrder={currentOrder}
      />
    </div>
  </th>
);

export default function EmployeeGrid({
  employees,
  onSelect,
  onSort,
  currentSort,
  currentOrder,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <HeaderCell
                field="name"
                label="Employee"
                onSort={onSort}
                currentSort={currentSort}
                currentOrder={currentOrder}
              />
              <HeaderCell
                field="_id"
                label="ID"
                onSort={onSort}
                currentSort={currentSort}
                currentOrder={currentOrder}
              />
              <HeaderCell
                field="role"
                label="Role"
                onSort={onSort}
                currentSort={currentSort}
                currentOrder={currentOrder}
              />
              <HeaderCell
                field="class"
                label="Dept"
                onSort={onSort}
                currentSort={currentSort}
                currentOrder={currentOrder}
              />
              <HeaderCell
                field="status"
                label="Status"
                onSort={onSort}
                currentSort={currentSort}
                currentOrder={currentOrder}
              />
              <HeaderCell
                field="attendance"
                label="Attendance"
                onSort={onSort}
                currentSort={currentSort}
                currentOrder={currentOrder}
              />
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                onClick={() => onSelect(emp)}
              >
                <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
                    {emp.name.charAt(0)}
                  </div>
                  {emp.name}
                </td>
                <td className="p-4 text-gray-500">#{emp.id.slice(-4)}</td>
                <td className="p-4 text-gray-500">{emp.role}</td>
                <td className="p-4 text-gray-500">
                  {emp.department || emp.class}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      emp.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status || "N/A"}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{emp.attendance}%</td>
                <td className="p-4 text-gray-400">
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:text-indigo-600 transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
