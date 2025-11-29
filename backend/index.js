const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { getUser } = require("./utils/auth");

// MongoDB Connection String
const MONGODB_URI =
  "mongodb+srv://mgoel1296_db_user:K5Hx02tz3dkGYB0S@cluster0.vmdqym1.mongodb.net/?appName=Cluster0";

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
    listen: { port: 4000 },
  });

  console.log(` Server ready at: ${url}`);
};

startServer();
