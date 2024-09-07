const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
//   busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  date: { type: Date, required: true },
  departureTime: { type: String, required: true }, // Store time as string (e.g., "08:00 AM")
  arrivalTime: { type: String, required: true }, // Same as departure
//   seatsAvailable: { type: Number, required: true },
//   totalSeats: { type: Number, required: true },
//   fare: { type: Number, required: true },
  scheduleType: { 
    type: String, 
    enum: ['manual', 'automatic', 'upload'], 
    default: 'manual' 
  }, // Defines if schedule is manual, auto, or bulk uploaded
  recurrence: { 
    type: String, 
    enum: ['none', 'daily', 'weekly', 'monthly'], 
    default: 'none' 
  }, // For automatic schedules

//   uploadDetails: { // Meta info for bulk upload
//     uploadId: { type: mongoose.Schema.Types.ObjectId, ref: 'UploadBatch' },
//     uploadedAt: { type: Date }
//   },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Indexing to improve query performance
// ScheduleSchema.index({ busId: 1, routeId: 1, date: 1 });

module.exports = mongoose.model('Schedule', ScheduleSchema);
