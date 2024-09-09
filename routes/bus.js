const express=require('express')
const { createBus } = require('../controllers/Bus')

const router=express.Router()

router.post('/api/v1/createBus',createBus)


module.exports=router