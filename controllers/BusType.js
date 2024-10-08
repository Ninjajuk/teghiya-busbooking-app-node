const BusType = require( '../model/busTypeSchema')

exports.addBusType = async (req, res) => {
    try {
        const { busModelName } = req.body
        if (!busModelName) return res.json({ reason: 'busModelName should not be empty' })
        const newBustype = new BusType(req.body)
        // console.log('addBusType', newBustype)
        await newBustype.save()
        res.status(200).json({ message: 'Added bus type successfully', data: newBustype })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create bustypes', error: error.message });
    }
}