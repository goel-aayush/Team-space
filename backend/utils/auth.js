const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const SECRET_KEY = "super_secret_key_change_this";

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
