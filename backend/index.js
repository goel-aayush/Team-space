const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { getUser } = require("./utils/auth");
require("dotenv").config();

// MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" DB Error:", err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      // Extract token from headers
      const token = req.headers.authorization || "";
      // Verify user and pass to resolvers
      const user = getUser(token.replace("Bearer ", ""));
      return { user };
    },
    listen: { port: PORT },
  });

  console.log(` Server ready at: ${url}`);
};

startServer();
