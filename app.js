const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectToDb = require("./database/db");
const RouteManage = require("./routes/route");

//middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const port = process.env.LOCAL_PORT || 3000; // environment variable or default to 3000

app.use("/", RouteManage);

app.get("/", (req, res) => {
  res.json({
    message: "Hi Samsu! How are you? I Love ajuk",
    originalUrl: req.originalUrl,
  });
});

connectToDb();
app.listen(port, async () => {
  console.log(`server is running at ${port}`);
});

// const winston = require("winston");
// const { Loggly } = require("winston-loggly-bulk");

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new Loggly({
//       token: "YOUR_LOGGLY_TOKEN",
//       subdomain: "YOUR_LOGGLY_SUBDOMAIN",
//       tags: ["Winston-NodeJS"],
//       json: true,
//     }),
//   ],
// });

// logger.info("Hello, this is a log message!");
