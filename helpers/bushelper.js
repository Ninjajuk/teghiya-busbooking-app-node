const Route = require('../model/route');
const Bus = require('../model/bus');
const { sendErrorHandler } = require('../utils/errorCode');

const busHelper = {
    getRouteById: async (routeName,req, res) => {
        try {
            // find route details from routeId  or route name
            const findRouteName = await Route.findOne({ routeName})
            // console.log('routeName',routeName._id)
            if (!findRouteName) {
                return sendErrorHandler('102', req)
            }

            return findRouteName;
            // const routeIdFromRoute = routeName._id;
    
            // // Find bus details based on the route ID
            // const findBus = await Bus.find({ _id: routeIdFromRoute });
            
            // if (!findBus || findBus.length === 0) {
            //   return res.status(404).json(sendErrorHandler('103', req)); // Bus not found
            // }
        
            // // If found, send the bus details
            // return res.status(200).json({ routeName, buses: findBus });
        }
        catch (error) {
            res.json(sendErrorHandler('104', req))
        }

    },

    getBusAndRouteDetails : async (req,checkSchedule) => {
        try {
            // const data = checkSchedule.map((item)=>{bus:item.busNumber,routeDetails:item.routeName})
            const data = checkSchedule.map((item)=>item.busNumber)
            if(!data) return sendErrorHandler('103', req)
            // if(data){
            //     const busDetails = await Bus.find({busName:})
            //     return  busDetails
            // }
            return data
        } catch (error) {
            
        }
    }
    

}
module.exports ={busHelper}