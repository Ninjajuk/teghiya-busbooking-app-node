const express=require('express')
const { addNewBus,getBusById,getAllBus ,updateBus,deleteBus} = require('../controllers/Bus')
const { addBusType} = require('../controllers/BusType')

const router=express.Router()

router
     .post('/api/v1/addNewBus',addNewBus)
     .post('/api/v1/getBusById',getBusById)
     .post('/api/v1/getAllBus',getAllBus)   //Retrieve a list of all buses.
     .post('/api/v1/updateBus',updateBus)    // Update details of a specific bus.
     .post('/api/v1/deleteBus',deleteBus)   //Remove a specific bus.
     .post('/api/v1/addBusType',addBusType)   // Bus type to check for total seat config and layout



module.exports=router


