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

            // Extract bus numbers from the checkSchedule data and Query the database to find bus details based on busNumbers
            const busNumbers = checkSchedule.map(schedule => schedule.busNumber);
            const busDetails = await Bus.find({ busNumber: { $in: busNumbers } });

            // Query the database to find route Details based on routeName
            const routeName = checkSchedule.map(schedule => schedule.routeName);
            const routeDetails = await Route.find({ routeName: { $in: routeName } });


            // Prepare the route details along with the bus details
            const routeDetail = checkSchedule.map(schedule => {
                const busDetail = busDetails.find(bus => bus.busNumber === schedule.busNumber);
                const routeDetail = routeDetails.find(route => route.routeName === schedule.routeName);
                return {
                    // busNumber: schedule.busNumber,
                    // routeName: schedule.routeName,
                    date: schedule.date,
                    departureTime: schedule.departureTime,
                    arrivalTime: schedule.arrivalTime,
                    scheduleType: schedule.scheduleType,
                    recurrence: schedule.recurrence,
                    busDetail: busDetail || {}, // Include bus details or an empty object if not found
                    routeDetail: routeDetail || {}, // Include route details or an empty object if not found
                };
            });

            // Prepare the response
            const response = {
                success: true,
                data: routeDetail,
                message: "Bus and route details retrieved successfully"
            };

            return response;
        } catch (error) {
            return { code: '10', reson: 'failed to fetch' }
        }
    }
    

}
module.exports ={busHelper}