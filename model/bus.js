const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 from uuid library

const BusSchema= new mongoose.Schema({
  busId: { type: String, default: uuidv4 }, // UUID for scalability
  busNumber: { type: String, required: true, unique: true }, // Unique bus number
  operatorName: { type: String, required: true }, // Operator or company name
  busType: { type: String, enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper', 'Electric'], required: true }, // Bus type
  totalSeats: { type: Number, required: true }, // Total seats capacity
  //seatsAvailable: { type: Number, required: true }, // Available seats for booking
  // images: {
  //   type: String,
  // },
  // Operational Status and Tracking
  status: { type: String, enum: ['active', 'in-maintenance', 'decommissioned', 'reserved'], default: 'active' }, // Operational status
// reservedBy: { type: String, ref: 'User' }, // If reserved, who reserved it (future use case)
 
  // Route Details
  routeDetails: {
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route'}, // Reference to the route
    assigned: { type: Boolean, default: false }, // Bus currently assigned to a route
   // preferredRoutes: [{ type: String, ref: 'Route' }], // Buses may be preferred for specific routes
  },

    // Extended Amenities
    amenities: [{
      type: String, 
      enum: ['WiFi', 'Charging Ports', 'Entertainment System', 'Restroom', 'Blankets', 'Water Bottles', 'Reclining Seats', 'CCTV', 'Air Suspension'], 
    }],

    // Operational Data
    gpsLocation: {
      latitude: { type: Number }, // Current GPS latitude
      longitude: { type: Number }, // Current GPS longitude
    },
    overallRating: { type: Number, min: 1, max: 5, default: 0 }, // Average rating
    
},  {
  timestamps: true, // For automatic createdAt and updatedAt fields
})

module.exports= mongoose.model('Bus',BusSchema)

// {    busId: { type: String, default: uuidv4 }, // UUID for scalability
// busNumber: { type: String, required: true, unique: true }, // Unique bus number
// licensePlate: { type: String, required: true, unique: true }, // Bus license plate
// capacity: { type: Number, required: true }, // Total seats capacity
// seatsAvailable: { type: Number, required: true }, // Available seats for booking
// busType: { type: String, enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'], required: true }, // Bus type
// operator: { type: String, required: true }, // Operator or company name

// // Extended Amenities
// amenities: [{
//   type: String, 
//   enum: ['WiFi', 'Charging Ports', 'Entertainment System', 'Restroom', 'Blankets', 'Water Bottles', 'Reclining Seats', 'CCTV', 'Air Suspension'], 
// }],

// // Driver Details
// driverDetails: { 
//   name: { type: String, required: true }, // Driver name
//   licenseNumber: { type: String, required: true }, // Driver license number
//   contactNumber: { type: String, required: true }, // Driver contact
//   experienceYears: { type: Number, required: true }, // Driver years of experience
//   lastSafetyTrainingDate: { type: Date }, // Date of last safety training
// },

// // Route Details
// routeDetails: {
//   routeId: { type: String, ref: 'Route', required: true }, // Reference to the route
//   assigned: { type: Boolean, default: false }, // Bus currently assigned to a route
//   preferredRoutes: [{ type: String, ref: 'Route' }], // Buses may be preferred for specific routes
// },

// // Safety and Maintenance
// safetyEquipment: [{
//   type: String, 
//   enum: ['Fire Extinguisher', 'First Aid Kit', 'Emergency Exits', 'Seat Belts', 'GPS Tracking', 'CCTV'],
// }],
// lastMaintenanceDate: { type: Date }, // Last maintenance date
// nextMaintenanceDueDate: { type: Date, required: true }, // Next scheduled maintenance
// maintenanceHistory: [{
//   date: { type: Date, required: true }, 
//   details: { type: String, required: true }, // Maintenance logs
//   cost: { type: Number }, // Maintenance cost
// }],

// // Insurance
// insuranceDetails: {
//   policyNumber: { type: String, required: true }, // Insurance policy number
//   expiryDate: { type: Date, required: true }, // Insurance expiry date
//   coverageDetails: { type: String }, // Coverage information
// },

// // Operational Data
// fuelType: { type: String, enum: ['Diesel', 'Petrol', 'CNG', 'Electric'], required: true }, // Fuel type
// fuelCapacity: { type: Number, required: true }, // Fuel capacity in liters
// fuelEfficiency: { type: Number, required: true }, // Fuel efficiency (km/l)
// averageSpeed: { type: Number, required: true }, // Average speed of the bus (in km/h)
// gpsLocation: {
//   latitude: { type: Number }, // Current GPS latitude
//   longitude: { type: Number }, // Current GPS longitude
// },

// // Customer Reviews and Ratings
// reviews: [{
//   userId: { type: String, ref: 'User', required: true },
//   rating: { type: Number, min: 1, max: 5, required: true }, // Rating (1-5)
//   comment: { type: String }, // Review comment
//   reviewDate: { type: Date, default: Date.now }, // Date of the review
// }],
// overallRating: { type: Number, min: 1, max: 5, default: 0 }, // Average rating

// // Operational Status and Tracking
// status: { type: String, enum: ['active', 'in-maintenance', 'decommissioned', 'reserved'], default: 'active' }, // Operational status
// reservedBy: { type: String, ref: 'User' }, // If reserved, who reserved it (future use case)
// currentRouteId: { type: String, ref: 'Route' }, // Currently assigned route (if active)

// "operationalStatus": {
//   "type": "String",
//   "enum": ["Active", "Inactive", "Under Maintenance", "Retired"],
//   "default": "Active",
//   "description": "Current operational status of the bus."
// },

// }