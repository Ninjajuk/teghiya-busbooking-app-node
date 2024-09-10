// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const redis = require("redis");
require("dotenv").config();

const uri = process.env.DATABASE_URL;

// Create a new MongoClient
// const client = new MongoClient(uri);
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DATABASE_URL); //Connection using mongoose
    // await client.connect(); // Connect the client to the server
    console.log("Connected successfully to MongoDB");

        // Connect to Redis
        await redisClient.connect();
        console.log(`Connected successfully to Redis at port ${process.env.REDIS_URL}`);
    
        // Handling Redis errors
        redisClient.on("error", (err) => console.log("Redis Client Error", err));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
module.exports = connectToDb;


// c) Separate Databases per Client (Isolated Data)