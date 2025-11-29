import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { List, Grid, X } from "lucide-react";
import { useDebounce } from "./hooks/useDebounce";
import {
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  ADD_EMPLOYEE,
} from "./graphql/operations";

// Component Imports
import Navbar from "./components/Navbar";
import EmployeeTiles from "./components/EmployeeTiles";
import EmployeeGrid from "./components/EmployeeGrid";
import DetailDrawer from "./components/DetailDrawer";
import Pagination from "./components/Pagination";
import { CardSkeleton, TableSkeleton } from "./components/Skeleton";

export default function Dashboard({ currentUser, onLogout }) {
  // State
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Sorting State
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [viewMode, setViewMode] = useState("tile");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const LIMIT = 10;

  // Query
  const { loading, error, data } = useQuery(GET_EMPLOYEES, {
    variables: {
      page,
      limit: LIMIT,
      filterName: debouncedSearchTerm,
      sortBy: sortBy,
      sortOrder: sortOrder,
    },
    fetchPolicy: "network-only",
  });

  // Mutations
  const [deleteEmployeeMutation] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [
      {
        query: GET_EMPLOYEES,
        variables: {
          page,
          limit: LIMIT,
          filterName: debouncedSearchTerm,
          sortBy,
          sortOrder,
        },
      },
    ],
    onCompleted: () => setSelectedEmployee(null),
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: (res) => {
      setSelectedEmployee((prev) => ({ ...prev, ...res.updateEmployee }));
      setIsEditing(false);
    },
  });

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [
      {
        query: GET_EMPLOYEES,
        variables: {
          page,
          limit: LIMIT,
          filterName: debouncedSearchTerm,
          sortBy,
          sortOrder,
        },
      },
    ],
    onCompleted: () => {
      setIsEditing(false);
      setSelectedEmployee(null);
    },
  });

  // Handlers
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployeeMutation({ variables: { id } });
      } catch (err) {
        alert("Error deleting: " + err.message);
      }
    }
  };

  const startAdding = () => {
    setSelectedEmployee({
      id: null,
      name: "",
      role: "EMPLOYEE",
      class: "",
      attendance: 0,
    });

    // Initialize ALL fields for a new user
    setEditForm({
      name: "",
      class: "",
      attendance: 0,
      password: "password123",
      age: 25,
      role: "EMPLOYEE",
      email: "",
      phone: "",
      location: "New York, USA",
      department: "",
      status: "Present",
    });
    setIsEditing(true);
  };

  const startEditing = () => {
    //Populate form with EXISTING values
    setEditForm({
      name: selectedEmployee.name,
      class: selectedEmployee.class,
      attendance: selectedEmployee.attendance,
      email: selectedEmployee.email || "",
      phone: selectedEmployee.phone || "",
      location: selectedEmployee.location || "",
      department: selectedEmployee.department || selectedEmployee.class || "",
      status: selectedEmployee.status || "Present",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (selectedEmployee.id) {
        await updateEmployee({
          variables: {
            id: selectedEmployee.id,
            ...editForm,
            attendance: parseFloat(editForm.attendance),
          },
        });
      } else {
        await addEmployee({
          variables: {
            ...editForm,
            attendance: parseFloat(editForm.attendance),
            age: 25,
            password: "password123",
          },
        });
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const onFormChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  // Error State Handling
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Error: {error.message}
      </div>
    );

  const employees = data?.getEmployees?.employees || [];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      <Navbar
        currentUser={currentUser}
        onLogout={onLogout}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          setPage(1);
        }}
      />

      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-2xl p-6 transition-transform">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-4">
              <li className="font-medium text-indigo-600">Overview</li>
              <li className="pl-4 border-l-2 border-gray-100 text-gray-500">
                Departments
              </li>
              <li className="pl-4 border-l-2 border-gray-100 text-gray-500">
                Analytics
              </li>
            </ul>
          </div>
        </>
      )}

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Employee Directory
            </h2>
            <p className="text-gray-500 text-sm">
              Manage your team members and permissions
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === "ADMIN" && (
              <button
                onClick={startAdding}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm"
              >
                Add Employee
              </button>
            )}
            <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md flex gap-2 text-sm font-medium ${
                  viewMode === "grid"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-500"
                }`}
              >
                <List className="w-4 h-4" /> List
              </button>
              <button
                onClick={() => setViewMode("tile")}
                className={`p-2 rounded-md flex gap-2 text-sm font-medium ${
                  viewMode === "tile"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-500"
                }`}
              >
                <Grid className="w-4 h-4" /> Grid
              </button>
            </div>
          </div>
        </div>

        {/* Skeleton Loading Logic */}
        {loading ? (
          viewMode === "tile" ? (
            <CardSkeleton />
          ) : (
            <TableSkeleton />
          )
        ) : viewMode === "tile" ? (
          <EmployeeTiles
            employees={employees}
            currentUser={currentUser}
            onSelect={setSelectedEmployee}
            onDelete={handleDelete}
          />
        ) : (
          <EmployeeGrid
            employees={employees}
            onSelect={setSelectedEmployee}
            onSort={handleSort}
            currentSort={sortBy}
            currentOrder={sortOrder}
          />
        )}

        {/* Hide pagination while loading to avoid jumping */}
        {!loading && (
          <Pagination
            currentPage={data?.getEmployees?.currentPage || 1}
            totalPages={data?.getEmployees?.totalPages || 1}
            setPage={setPage}
          />
        )}
      </main>

      <DetailDrawer
        selectedEmployee={selectedEmployee}
        isEditing={isEditing}
        editForm={editForm}
        currentUser={currentUser}
        onClose={() => {
          setSelectedEmployee(null);
          setIsEditing(false);
        }}
        onEditToggle={startEditing}
        onDelete={handleDelete}
        onSave={handleSave}
        onFormChange={onFormChange}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}
