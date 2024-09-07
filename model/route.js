const mongoose = require("mongoose");
const { Schema } = mongoose;
const routeSchema = new Schema(
  {
    routeId: { type: String, unique: true, required: true }, // Unique route identifier
    routeName: { type: String },
    startLocation: {
      city: String,
      state: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere", // Geospatial index for faster location-based queries
      },
    },
    endLocation: {
      city: String,
      state: String,
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    waypoints: [
      {
        city: String,
        state: String,
        coordinates: {
          type: [Number],
          index: "2dsphere",
        },
      },
    ],
    distance: Number, // Total distance in km
    estimatedTime: Number, // In minutes
    active: { type: Boolean, default: true }, // Route status
  },
  {
    timestamps: true, // For automatic createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Route", routeSchema);
