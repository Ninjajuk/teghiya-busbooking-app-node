const Route = require("../model/route");
const errorHandler = require("../utils/schemaErrorHandler");
const routeHelper = require("../helpers/routehelper");

// Create a new route
exports.createRoute = async (req, res) => {
  try {
    const { startLocation, endLocation } = req.body;

    // Generate a unique ID
    const routeId = routeHelper.generateUniqueRouteId(
      startLocation,
      endLocation
    );
    console.log(routeId);

    const route = new Route(req.body);
    // console.log("Checking route instance:", route); // Log the route instance

    // await route.save();
    // console.log("Route saved successfully");

    res.status(201).json(route);
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.allRoutes = async (req, res) => {
  try {
    res.json({ message: "all routes" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
