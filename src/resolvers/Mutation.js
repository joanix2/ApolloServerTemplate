const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./utils");

// Function for posting (stubbed out here)
function post(parent, args, context) {
  // Extract userId from the context
  const { userId } = context;

  // Throw an error if the user is not authenticated
  if (!userId) {
    throw new Error("Authentication required to create a new link.");
  }

  // Extract URL and description from the arguments
  const { url, description } = args;

  // Create a new link in the database, associating it with the authenticated user
  const newLink = context.prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: userId } }, // Connects the new link to the user
    },
  });

  // Return the newly created link
  return newLink;
}

// Signup resolver function
async function signup(parent, args, context) {
  // Hash the password using bcrypt
  const password = await bcrypt.hash(args.password, 10);

  // Create a new user in the database using Prisma
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  // Generate a JSON Web Token
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // Return the token and user data
  return {
    token,
    user,
  };
}

// Login resolver function
async function login(parent, args, context) {
  // Find the user by email
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  // Throw an error if the user does not exist
  if (!user) {
    throw new Error("No such user found");
  }

  // Compare the provided password with the stored password
  const valid = await bcrypt.compare(args.password, user.password);

  // Throw an error if the password is invalid
  if (!valid) {
    throw new Error("Invalid password");
  }

  // Generate a JSON Web Token
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // Return the token and user data
  return {
    token,
    user,
  };
}

// Export the resolver functions
module.exports = {
  post,
  login,
  signup,
};
