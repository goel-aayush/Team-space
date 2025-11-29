const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw new GraphQLError("Invalid/Expired Token", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
  }
  return null;
};

module.exports = { getUser, SECRET_KEY };
