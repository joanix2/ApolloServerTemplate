const jwt = require("jsonwebtoken");

// Access environment variables using process.env
const APP_SECRET = process.env.APP_SECRET;

if (!APP_SECRET) {
  throw new Error("APP_SECRET environment variable is not defined!");
}

// Function to verify and decode the JWT token
function getTokenPayload(token) {
  try {
    return jwt.verify(token, APP_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else if (err.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    }
    throw new Error("Token verification failed !");
  }
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
