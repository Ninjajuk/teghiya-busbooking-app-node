const Route = require("../model/route");

const db = {
  findone: async (routeId) => {
    try {
      const routeExists = await Route.findOne({ routeId });
      if (routeExists) {
        return {
          code: 400,
          message:
            "Duplicate routeId: A route with the same start and end location already exists",
        };
      }
      return { code: 200 }; // Return 200 if no route exists
    } catch (error) {
      console.error("Error occurred while checking route:", error);
      return {
        code: 500,
        message: "An error occurred while checking the route",
      };
    }
  },
};

module.exports = db;


