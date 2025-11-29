const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Float
    role: String
    department: String
    status: String
    email: String
    phone: String
    location: String
  }

  type AuthPayload {
    token: String!
    user: Employee!
  }

  type EmployeeResponse {
    employees: [Employee]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
  }

  type Query {
    login(name: String!, password: String!): AuthPayload
    getEmployees(
      page: Int
      limit: Int
      sortBy: String
      sortOrder: String
      filterName: String
    ): EmployeeResponse!
    getEmployee(id: ID!): Employee
  }

  type Mutation {
   
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String]
      attendance: Float!
      role: String!
      password: String!
      # Optional new fields
      department: String
      status: String
      email: String
      phone: String
      location: String
    ): Employee!

    
    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      attendance: Float
      department: String
      status: String
      email: String
      phone: String
      location: String
    ): Employee!

    deleteEmployee(id: ID!): String
  }
`;

module.exports = typeDefs;
