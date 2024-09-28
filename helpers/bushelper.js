const Route = require('../model/route');
const { sendErrorHandler } = require('../utils/errorCode');
const helper = {
    getRouteById: async (routeId,req, res) => {
        try {
            // find route details from routeId  or route name
            const routeName = await Route.findOne({ routeId})
            // console.log('routeName',routeName._id)
            if (!routeName) {
                return res.json(sendErrorHandler('102', req))
            }

            return routeName;
            const routeIdFromRoute = routeName._id;
    
            // Find bus details based on the route ID
            // const findBus = await Bus.find({ _id: routeIdFromRoute });
            
            // if (!findBus || findBus.length === 0) {
            //   return res.status(404).json(sendErrorHandler('103', req)); // Bus not found
            // }
        
            // If found, send the bus details
            // return res.status(200).json({ routeName, buses: findBus });
        }
        catch (error) {
            res.json(sendErrorHandler('104', req))
        }

    }
}
module.exports ={helper}