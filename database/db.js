// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DATABASE_URL;

// Create a new MongoClient
// const client = new MongoClient(uri);

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DATABASE_URL); //Connection using mongoose
    // await client.connect(); // Connect the client to the server
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
module.exports = connectToDb;
