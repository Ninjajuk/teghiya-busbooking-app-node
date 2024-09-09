const mongoose=require('mongoose')

const BusSchema=new mongoose.Schema({
    busType:{type:String},
    busId:{type:String,required: true,unique:true},
    




})

module.exports= mongoose.model('Bus',BusSchema)