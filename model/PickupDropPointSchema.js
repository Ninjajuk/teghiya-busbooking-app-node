
const mongoose = require('mongoose')

const{Schema} = mongoose

const pickUpDropPointsSchema = new Schema({
    pickUpDropPointId :{type:String,required:true,unique:true},
    busOperatorId :{type:String,default: null},
    // route :{type:mongoose.Schema.Types.ObjectId,ref:'Route'},
    pickUpPoint:{type:[]},
    DropOffPoint:{type:[]},
})

module.exports = mongoose.model('PickUpAndDropPoints',pickUpDropPointsSchema)