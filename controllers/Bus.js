const Bus = require('../model/bus');
const { v4: uuidv4 } = require('uuid');


// ADD a new bus
exports.addNewBus = async (req, res) => {
  try {
    // Generate a new UUID
    const newBusId = uuidv4();
    req.body.busId=newBusId
    const newBus = new Bus(req.body); // Create a new bus with the data from the request body
    await newBus.save(); // Save the new bus to the database
    res.status(201).json({ message: 'Bus created successfully', data: newBus });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create bus', error: error.message });
  }
};

// Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find(); // Find all buses in the database
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve buses', error: error.message });
  }
};

// Get a bus by ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id); // Find the bus by its ID
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve bus', error: error.message });
  }
};

// Update a bus by ID
exports.updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find the bus and update it
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus updated successfully', data: bus });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update bus', error: error.message });
  }
};

// Delete a bus by ID
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id); // Find the bus and delete it
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete bus', error: error.message });
  }
};
