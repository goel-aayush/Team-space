const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  subjects: [{ type: String }],
  attendance: { type: Number, required: true },
  role: { type: String, enum: ["ADMIN", "EMPLOYEE"], default: "EMPLOYEE" },
  password: { type: String, required: true },

  department: { type: String, default: "General" },
  status: {
    type: String,
    enum: ["Present", "Absent", "On Leave"],
    default: "Present",
  },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  location: { type: String, default: "New York, USA" },
});

module.exports = mongoose.model("Employee", employeeSchema);
