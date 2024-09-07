const express = require("express");
const { createRoute, allRoutes } = require("../controllers/route");

const router = express.Router();

router.post("/routes", createRoute).get("/allroutes", allRoutes);

module.exports = router;
