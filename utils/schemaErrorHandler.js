/**
 * Handles Mongoose-related errors and formats them for the response.
 * @param {Object} error - The error object.
 * @param {Object} res - The Express response object.
 */
const errorHandler = (error, res) => {
  if (error.name === "ValidationError") {
    // Handle Mongoose schema validation errors
    const validationErrors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    res.status(400).json({
      error: "Schema validation failed",
      details: validationErrors,
    });
  } else if (error.code === 11000) {
    // Handle unique constraint errors (like duplicate routeId)
    res.status(400).json({
      error: "Duplicate key error",
      details: "A route with the same routeId already exists",
    });
  } else {
    // Handle other potential errors (e.g., MongoDB connection issues)
    res.status(500).json({
      error: "An error occurred",
      details: error.message,
    });
  }
};

module.exports = errorHandler;
