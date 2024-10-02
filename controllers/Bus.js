const Bus = require('../model/bus');
const Route = require('../model/route');
const { v4: uuidv4 } = require('uuid');
const { sendErrorHandler } = require('../utils/errorCode');
const {busHelper}  =require ('../helpers/bushelper');
const {schedulehelper}  =require ('../helpers/schdeulehelper');
const { default: axios } = require('axios');

// ADD a new bus
exports.addNewBus = async (req, res) => {
  try {
    
    const {busNumber} = req.body

    // check for unique bus number
    const checkBusExists = await Bus.find({busNumber})
    if(checkBusExists) return res.status(400).json(sendErrorHandler('55', req))

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
exports.getAllBus = async (req, res) => {
  try {
    const buses = await Bus.find(); // Find all buses in the database
    
    res.status(200).json({buses,originalUrl: req.originalUrl,path:req.path});
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve buses', error: error.message });
  }
};

// Get a bus by ID
exports.getBusById = async (req, res) => {
  try {
    const {busId} = req.body
    const bus = await Bus.findOne({busId:busId}); // Find the bus by its ID
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


exports.testPerformance = async(req,res) =>{
  try {
    const [data1,data2] =await Promise.all([fetch('https://dummyjson.com/products/1'),fetch('https://dummyjson.com/users/1')])
    const resp1 =await data1.json()
    const resp2 =await data2.json()
    res.status(200).json({data1:resp1?.title,data2:resp2?.address?.state,})

    // const resp1 = await fetch('https://dummyjson.com/products/1')
    // const data1 = await resp1.json()

    // const resp2 = await fetch('https://dummyjson.com/products/1')
    // const data2 = await resp2.json()
    // res.status(200).json({data1:data1,data2:data2,})
  } catch (error) {
    console.error('error',error)
  }
}


// exports.busSearch = async (req, res) => {

//   try {
//     // const routeName = 'DELHI-SHIMLA'
//     const { routeName, dateOfJourney } = req.body;

//     if (!routeName) {
//       return res.json(sendErrorHandler('101', req))
//     }

//     // find route details from routeId  or route name
//     const checkeRouteExist = await helper.getRouteById(routeName, req, res)
//     if (checkeRouteExist.code) return res.status(400).json(checkeRouteExist)
//     res.json({ data: 'success', })

//   } catch (error) {
//     res.json({ error: error.message })
//   }
// }

exports.busSearch = async (req, res) => {

  try {

    //check if the routeName and the date of journey is available or nmot
    const checkSchedule = await schedulehelper.getScheduleByDateAndRoute(req, res)
    if (checkSchedule.code) return res.status(404).json(checkSchedule)

    //Get bus Details and Route details from the checkSchedule
    const busDetails = await busHelper.getBusAndRouteDetails(req, checkSchedule)
    if (busDetails.code) return res.status(404).json(busDetails)

    res.json({ data: busDetails })
  } catch (error) {
    res.json({ error: error.message })
  }
}


// const {customAlphabet} = require('nanoid')
// const nanoid =  customAlphabet('ahgjagsjh')
// nanoid(12)