const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const resolvers = require("./resolvers"); // Import your resolvers
const { getUserId } = require("./resolvers/utils"); // Import the `getUserId` utility

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Create and configure the Apollo Server
const server = new ApolloServer({
  // Load the GraphQL schema definition from a file
  typeDefs: fs.readFileSync(
    path.join(__dirname, "schema.graphql"), // Path to your schema file
    "utf8" // File encoding
  ),
  resolvers, // Attach resolvers

  // Context function to provide shared objects like `prisma` and `userId` to resolvers
  context: ({ req }) => {
    return {
      ...req, // Spread request object to include headers and other properties
      prisma, // Attach Prisma Client instance
      userId:
        req && req.headers.authorization // Check for Authorization header
          ? getUserId(req) // Extract userId from token if header is present
          : null, // Otherwise, set userId to null
    };
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
