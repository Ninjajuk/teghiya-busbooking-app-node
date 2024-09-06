const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;

// Database name
const dbName = "mydatabase";

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToDb() {
  try {
    await client.connect(); // Connect the client to the server
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close(); // Close the connection
  }
}
