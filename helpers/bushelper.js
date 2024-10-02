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

            // Extract bus numbers from the checkSchedule data
            const busNumbers = checkSchedule.map(schedule => schedule.busNumber);


            const routeName = checkSchedule.map(schedule => schedule.routeName);


            // Query the database to find bus details based on busNumbers
            const busDetails = await Bus.find({ busNumber: { $in: busNumbers } });

            // Query the database to find bus details based on busNumbers
            const routeDetails = await Bus.find({ routeName: { $in: routeName } });

            return {route:routeDetails,bus:busDetails}



             // Prepare the route details along with the bus details
        const routeDetail = checkSchedule.data.map(schedule => {
            const busDetail = busDetails.find(bus => bus.busNumber === schedule.busNumber);
            const routeDetail = routeDetails.find(route => route.routeName === route.routeName);
            return {
                busNumber: schedule.busNumber,
                routeName: schedule.routeName,
                date: schedule.date,
                departureTime: schedule.departureTime,
                arrivalTime: schedule.arrivalTime,
                scheduleType: schedule.scheduleType,
                recurrence: schedule.recurrence,
                busDetail: busDetail || {}, // Include bus details or an empty object if not found
                routeDetail: routeDetail || {}, // Include bus details or an empty object if not found
            };
        });

        // Prepare the response
        const response = {
            success: true,
            data: routeDetails,
            message: "Bus and route details retrieved successfully"
        };

        return response;
        } catch (error) {
            return {code:'10',reson:'failed to fetch'}
        }
    }
    

}
module.exports ={busHelper}