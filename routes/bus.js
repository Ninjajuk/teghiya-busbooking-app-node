const express=require('express')
const { addNewBus,getBusById } = require('../controllers/Bus')

const router=express.Router()

router
     .post('/api/v1/addNewBus',addNewBus)
     .post('/api/v1/getBusById',getBusById)


module.exports=router