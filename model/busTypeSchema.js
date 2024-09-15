
const mongoose  = require('mongoose')

const {Schema} = mongoose

const busTypeschema = new Schema({
    manufacturer: {type: String,required: true},
    busModelName: {type: String,required: true,unique: true },
    busType: { type: String, required: true, enum: ["Standard","Luxury","Semi-Luxury","Sleeper","Double-Decker"],default: 'Standard' },
    seatConfiguration: {type: String},
    totalCapacity: {type: Number,required: true },

})

const BusType = mongoose.model('BusType',busTypeschema)

module.exports =BusType
