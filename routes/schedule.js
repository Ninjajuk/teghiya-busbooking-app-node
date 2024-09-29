const express = require("express");
const router=express.Router()
const {manualSchedule,getScheduleByDateAndRoute} =require('../controllers/Schedule')

router
.post("/api/v1/manualSchedule",manualSchedule)
.post("/api/v1/schedule/getScheduleByDateAndRoute",getScheduleByDateAndRoute)
.post("/api/v1/schedule/getScheduleByDate",manualSchedule)
// .post("/api/v1/createRoute");

module.exports=router