const express=require('express')
const { addNewBus,getBusById } = require('../controllers/Bus')

const router=express.Router()

router
     .post('/api/v1/addNewBus',addNewBus)
     .post('/api/v1/getBusById',getBusById)
     .post('/api/v1/getAllBuses')   //Retrieve a list of all buses.
     .post('/api/v1/updateBus')    // Update details of a specific bus.
     .post('/api/v1/deleteBus',)   //Remove a specific bus.


module.exports=router


