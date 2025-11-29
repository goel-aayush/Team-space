import React, { useState, useEffect } from "react";
import { X, Edit, Trash2, AlertCircle } from "lucide-react";
import { Section, Field } from "./Shared";

export default function DetailDrawer({
  selectedEmployee,
  isEditing,
  editForm,
  currentUser,
  onClose,
  onEditToggle,
  onDelete,
  onSave,
  onFormChange,
  setIsEditing,
}) {
  const [errors, setErrors] = useState({});

  // Reset errors when opening/closing
  useEffect(() => {
    const handle = setTimeout(() => {
      setErrors({});
    }, 0);
    return () => clearTimeout(handle);
  }, [selectedEmployee, isEditing]);

  if (!selectedEmployee) return null;

  // Validation Logic
  const handleSaveClick = () => {
    const newErrors = {};

    if (!editForm.name?.trim()) newErrors.name = "Full Name is required";
    if (!editForm.class?.trim()) newErrors.class = "Department is required";

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editForm.email && !emailRegex.test(editForm.email)) {
      newErrors.email = "Invalid email format";
    }

    // Attendance Range
    if (editForm.attendance < 0 || editForm.attendance > 100) {
      newErrors.attendance = "Must be between 0-100";
    }

    setErrors(newErrors);

    // Only save if no errors
    if (Object.keys(newErrors).length === 0) {
      onSave();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out translate-x-0">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">
              {isEditing
                ? selectedEmployee.id
                  ? "Edit Employee"
                  : "Add Employee"
                : "Employee Details"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                {selectedEmployee.name ? selectedEmployee.name.charAt(0) : "?"}
              </div>
              <div>
                {!isEditing ? (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {selectedEmployee.name}
                    </h1>
                    <p className="text-lg text-indigo-600">
                      {selectedEmployee.role}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">
                    {selectedEmployee.id
                      ? "Editing profile..."
                      : "Creating new profile..."}
                  </p>
                )}
              </div>
            </div>

            {!isEditing ? (
              /* View mode */
              <>
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={onEditToggle}
                    className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium hover:bg-gray-50"
                  >
                    <Edit className="w-3 h-3" /> Edit
                  </button>

                  {currentUser.role === "ADMIN" && (
                    <button
                      onClick={(e) => onDelete(selectedEmployee.id, e)}
                      className="flex items-center gap-1 px-3 py-1 bg-white border border-red-200 rounded-md text-xs font-medium hover:bg-red-50 text-red-600"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <Section title="Personal Info">
                    <Field
                      label="Email"
                      value={selectedEmployee.email || "N/A"}
                    />
                    <Field
                      label="Phone"
                      value={selectedEmployee.phone || "N/A"}
                    />
                    <Field
                      label="Location"
                      value={selectedEmployee.location || "N/A"}
                    />
                  </Section>
                  <Section title="Employment">
                    <Field
                      label="Department"
                      value={
                        selectedEmployee.class || selectedEmployee.department
                      }
                    />
                    <Field
                      label="Status"
                      value={selectedEmployee.status || "Present"}
                    />
                    <Field
                      label="Attendance"
                      value={`${selectedEmployee.attendance}%`}
                    />
                    <Field label="ID" value={selectedEmployee.id} />
                  </Section>
                </div>
              </>
            ) : (
              /* Edit/Add form */
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) => onFormChange("name", e.target.value)}
                      className={`w-full p-2 border rounded-lg outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-indigo-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email || ""}
                        onChange={(e) => onFormChange("email", e.target.value)}
                        className={`w-full p-2 border rounded-lg outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-indigo-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={editForm.phone || ""}
                        onChange={(e) => onFormChange("phone", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department / Class *
                      </label>
                      <input
                        type="text"
                        value={editForm.class || ""}
                        onChange={(e) => onFormChange("class", e.target.value)}
                        className={`w-full p-2 border rounded-lg outline-none focus:ring-2 ${
                          errors.class
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-indigo-500"
                        }`}
                        placeholder="e.g. Engineering"
                      />
                      {errors.class && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.class}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editForm.status || "Present"}
                        onChange={(e) => onFormChange("status", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.location || ""}
                      onChange={(e) => onFormChange("location", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attendance (%)
                    </label>
                    <input
                      type="number"
                      value={editForm.attendance}
                      onChange={(e) =>
                        onFormChange("attendance", e.target.value)
                      }
                      className={`w-full p-2 border rounded-lg outline-none focus:ring-2 ${
                        errors.attendance
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-indigo-500"
                      }`}
                    />
                    {errors.attendance && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.attendance}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveClick}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
