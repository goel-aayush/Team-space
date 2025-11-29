import React from "react";
import { Menu, Search } from "lucide-react";

export default function Navbar({
  currentUser,
  onLogout,
  setSidebarOpen,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6 text-indigo-600" />
        </button>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
          TeamSpace
        </h1>
        <div className="hidden md:flex gap-6 ml-8 text-sm font-medium text-gray-500">
          <a href="#" className="text-indigo-600">
            Dashboard
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Employees
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Payroll
          </a>
        </div>

        <div className="ml-4 md:ml-8 max-w-md w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
          {currentUser.name.charAt(0)}
        </div>
        <span className="text-sm font-medium mr-2">
          {currentUser.name} ({currentUser.role})
        </span>
        <button
          onClick={onLogout}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
