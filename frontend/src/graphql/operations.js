import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees(
    $page: Int!
    $limit: Int!
    $filterName: String
    $sortBy: String
    $sortOrder: String
  ) {
    getEmployees(
      page: $page
      limit: $limit
      filterName: $filterName
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      employees {
        id
        name
        role
        class
        department
        attendance
        status
        email
        phone
        location
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_SINGLE_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      name
      role
      class
      department
      attendance
      status
      email
      phone
      location
    }
  }
`;
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $class: String
    $attendance: Float
    $department: String
    $status: String
    $email: String
    $phone: String
    $location: String
  ) {
    updateEmployee(
      id: $id
      name: $name
      class: $class
      attendance: $attendance
      department: $department
      status: $status
      email: $email
      phone: $phone
      location: $location
    ) {
      id
      name
      status
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $age: Int!
    $class: String!
    $attendance: Float!
    $role: String!
    $password: String!
    $department: String
    $status: String
    $email: String
    $phone: String
    $location: String
  ) {
    addEmployee(
      name: $name
      age: $age
      class: $class
      subjects: []
      attendance: $attendance
      role: $role
      password: $password
      department: $department
      status: $status
      email: $email
      phone: $phone
      location: $location
    ) {
      id
      name
    }
  }
`;
