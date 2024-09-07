const express = require("express");
const router=express.Router()
const {manualSchedule} =require('../controllers/Schedule')

router
.post("/api/v1/manualSchedule",manualSchedule)
// .post("/api/v1/createRoute");

module.exports=router