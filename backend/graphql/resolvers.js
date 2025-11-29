const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/auth");
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    login: async (_, { name, password }) => {
      const user = await Employee.findOne({ name });
      if (!user || user.password !== password) {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1d",
      });
      return { token, user };
    },

    getEmployees: async (
      _,
      { page = 1, limit = 10, sortBy = "name", sortOrder = "asc", filterName },
      context
    ) => {
      // Auth Check: Ensure user is logged in
      if (!context.user)
        throw new GraphQLError("You must be logged in", {
          extensions: { code: "UNAUTHENTICATED" },
        });

      const query = {};

      if (context.user.role === "EMPLOYEE") {
        query._id = context.user.id;
      } else {
        // admin logic
        if (filterName) {
          query.name = { $regex: filterName, $options: "i" };
        }
      }

      // Pagination & Sorting
      const skip = (page - 1) * limit;
      const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

      const employees = await Employee.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      const totalCount = await Employee.countDocuments(query);

      return {
        employees,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    },

    getEmployee: async (_, { id }, context) => {
      if (!context.user)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      return await Employee.findById(id);
    },
  },

  Mutation: {
    addEmployee: async (_, args, context) => {
      // Authorization: Only ADMIN can add employees
      if (!context.user || context.user.role !== "ADMIN") {
        throw new GraphQLError("Access Denied: Admins only", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      // UPDATE: Apply defaults for new fields if not provided
      const newEmployee = new Employee({
        ...args,
        department: args.department || args.class,
        status: args.status || "Present",
        location: args.location || "New York, USA",
        email: args.email || "",
        phone: args.phone || "",
      });

      return await newEmployee.save();
    },

    updateEmployee: async (_, { id, ...updates }, context) => {
      // Authorization: Admin Only
      if (!context.user || context.user.role !== "ADMIN") {
        throw new GraphQLError("Access Denied", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteEmployee: async (_, { id }, context) => {
      if (!context.user || context.user.role !== "ADMIN") {
        throw new GraphQLError("Access Denied", {
          extensions: { code: "FORBIDDEN" },
        });
      }
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    },
  },
};

module.exports = resolvers;
