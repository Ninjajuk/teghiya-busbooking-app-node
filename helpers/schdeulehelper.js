const Schedule= require( '../model/schedule')
const { sendErrorHandler } = require('../utils/errorCode')

const schedulehelper = {
    getScheduleByDateAndRoute: async (req, res) => {
        try {
            const { routeName, dateOfJourney } = req.body
            
            // Check if routeName and dateOfJourney is empty or not
            if (!routeName || !dateOfJourney) return sendErrorHandler('50', req)

            // Check if the routeName exists in the database
            const routeExists = await Schedule.findOne({ routeName });
            if (!routeExists) return sendErrorHandler('51', req)

            // Now check for schedules with the provided routeName and dateOfJourney
            const journeyRoute = await Schedule.find({ routeName, date: dateOfJourney })
            if (journeyRoute.length === 0) return sendErrorHandler('52', req)

            // If we have schedules, return them
            return journeyRoute
        } catch (error) {
            res.status(404).json({ "error:": error.message })
        }

    }
}
module.exports ={schedulehelper}