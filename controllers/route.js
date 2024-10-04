const Route = require("../model/route");
 const PickUpAndDropPoints = require ('../model/PickupDropPointSchema')
const errorHandler = require("../utils/schemaErrorHandler");
const routeHelper = require("../helpers/routehelper");
const db = require("../database/db");
const { sendErrorHandler } = require("../utils/errorCode");

const routeController={

}

// Create a new route
exports.createRoute = async (req, res) => {
  try {
    //Validate incoming Data
    // const validateRoute= await handlevalidateRoutes(req)
    const { startLocation, endLocation } = req.body;

    // Generate a unique ID

    // const routeName = routeHelper.generateUniqueRouteId(startLocation,endLocation);

    // Check if a route with the same ID already exists in the database
    // const result = await db.findone(routeName);
    // if (result.code === 400) return res.json({ result: result.message });
    // if (result.code === 500) return res.json({ result: result.message });

    // Create and save the new route
    const route = new Route({ ...req.body });
    await route.save();
    res.status(201).json({ message: "Successfully added New Route", data: route });

  } catch (error) {
    errorHandler(error, res);
  }
};



// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
    
      const routes = await Route.find(); // Add filters as needed
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a specific route
exports.getRouteById = async (req, res) => {
  try {
    const { routeId } = req.body
    // console.log(routeId)
    if (!routeId) return res.status(400).json(sendErrorHandler('101', req))

    const route = await Route.findOne({ routeId });
    if (!route) return res.status(404).json(sendErrorHandler('102', req))
      
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message, reason: 'not found' });
  }
};
  
  // Update a route
  exports.updateRoute = async (req, res) => {
    try {
      const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!route) return res.status(404).json({ message: 'Route not found' });
      res.status(200).json(route);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a route
  exports.deleteRoute = async (req, res) => {
    try {
      const route = await Route.findByIdAndDelete(req.params.id);
      if (!route) return res.status(404).json({ message: 'Route not found' });
      res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



exports.addPickUpAndDropPoints = async (req, res) => {
  try {
    const { route } = req.body

    //check if it is already there
    const checkRoute = await Route.find({route})
    if(checkRoute) return res.json({reason:'Already present'})

    // const pickUpAndDropPoint = new PickUpAndDropPoints(req.body)
    // //create new  pickUpAndDropPoint instance
    // await pickUpAndDropPoint.save()
    res.status(200).json({ message: 'Added Pick Up and Drop Point Successfully', data: pickUpAndDropPoint })
  } catch (error) {
    res.status(400).json({ error: 'error adding pick and drop points', reason: error.message })
  }
}
