const jwt = require("jsonwebtoken");
const APP_SECRET = "eric-tech-graphql-tutorial"; // Secret key for signing tokens

// Function to verify and decode the JWT token
function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET); // Verifies the token using the APP_SECRET
}

// Function to retrieve the user ID from the request or authorization token
function getUserId(req, authToken) {
  // Check if the request contains an authorization header
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Extract the token by removing the "Bearer " prefix
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      // Decode and return the userId from the token payload
      const { userId } = getTokenPayload(token);
      return userId;
    }
  }
  // If no request object, check if an authToken is directly provided
  else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  // Throw an error if neither the request nor the authToken is valid
  throw new Error("Not authenticated");
}

// Export the utility functions and constants
module.exports = {
  APP_SECRET,
  getTokenPayload,
  getUserId,
};
