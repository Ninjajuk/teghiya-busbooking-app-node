const express=require('express')
const { addNewBus } = require('../controllers/Bus')

const router=express.Router()

router.post('/api/v1/addNewBus',addNewBus)


module.exports=router