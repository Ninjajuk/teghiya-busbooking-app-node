const Route = require("../model/route");

// findOne, findMany, insertOne,inserMany
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
  checkIfExists :async (model, query) => {
    try {
      const document = await model.find(query);
      return document; // Returns the found document or null
    } catch (error) {
      throw new Error('Error checking existence: ' + error.message);
    }
  },
  insertOneDocument : async (model, data) => {
    try {
      const document = new model(data);
      const savedDocument = await document.save();
      return savedDocument; // Returns the saved document
    } catch (error) {
      throw new Error('Error inserting document: ' + error.message);
    }
  },
  
};

module.exports = db;


