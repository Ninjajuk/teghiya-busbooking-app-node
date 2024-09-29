
const Schedule=require('../model/schedule')
const { sendErrorHandler } = require('../utils/errorCode');

exports.manualSchedule = async (req, res) => {
    try {
        const { routeName, busNumber, date  } = req.body

        // Check for existing schedules with the same busNumber on the same date and Route
        const existingSchedule = await Schedule.findOne({
            busNumber,
            date,
            $or: [
                { routeName }, // Same route
                { routeName: { $ne: routeName } } // Different route
              ]
        });

        if (existingSchedule) {
            if (existingSchedule.routeName === routeName) return res.status(400).json(sendErrorHandler('53', req))
            else {
                return res.status(400).json(sendErrorHandler('54', req))
            }
        }
  
        // Create the new schedule
        const newSchedule = new Schedule(req.body)
        await newSchedule.save()
        res.json({ message: 'New manual schedule success', data: newSchedule })
    } catch (error) {
        res.json((error.message))
    }
}

exports.getScheduleByDateAndRoute = async (req, res) => {
    try {
        const { routeName, dateOfJourney } = req.body
        

        // Check if routeName and dateOfJourney is empty or not
        if (!routeName || !dateOfJourney) return res.status(400).json(sendErrorHandler('50', req))

        // Check if the routeName exists in the database
        const routeExists = await Schedule.findOne({ routeName });
        if (!routeExists) return res.status(404).json(sendErrorHandler('51', req))

        // Now check for schedules with the provided routeName and dateOfJourney
        const journeyRoute = await Schedule.find({ routeName, date: dateOfJourney })
        if (journeyRoute.length === 0) return res.status(404).json(sendErrorHandler('52', req))

        // If we have schedules, return them
        res.status(200).json({ data: journeyRoute })
    } catch (error) {
        res.status(402).json({ reason: error.message })
    }
}