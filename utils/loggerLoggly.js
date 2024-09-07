const winston = require("winston");
const { Loggly } = require("winston-loggly-bulk");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new Loggly({
      token: "YOUR_LOGGLY_TOKEN",
      subdomain: "YOUR_LOGGLY_SUBDOMAIN",
      tags: ["Winston-NodeJS"],
      json: true,
    }),
  ],
});

logger.info("Hello, this is a log message!");