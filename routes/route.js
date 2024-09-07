const express = require("express");
const { createRoute, getAllRoutes,getRouteById,updateRoute,deleteRoute } = require("../controllers/route");

const router = express.Router();

router
.post("/api/v1/createRoute", createRoute)   //create new route of the bus
.post("/api/v1/allRoute", getAllRoutes)  //Retrieve all routes (with filters).
.post('/api/v1/routeById',getRouteById)  //Retrieve a specific route.
.post('/api/v1/updateRoute',updateRoute)   //Update a route.
.delete('/api/v1/route:id',deleteRoute)  //Delete a route.


module.exports = router;
