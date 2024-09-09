const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectToDb = require("./config/mongoDb");
const RouteManage = require("./routes/route");
const ScheduleManage= require('./routes/schedule')
//middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const port = process.env.LOCAL_PORT || 3000; // environment variable or default to 3000

app.use("/", RouteManage);
app.use("/", ScheduleManage);

app.get("/", (req, res) => {
  res.json({
    message: " I Love JavaScript",
    originalUrl: req.originalUrl,
  });
});

connectToDb();
app.listen(port, async () => {
  console.log(`server is running at ${port}`);
});


