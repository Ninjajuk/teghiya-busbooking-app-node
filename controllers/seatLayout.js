

exports.createBusSeatLayout = async(req, res) => {
    try {
        const {busId} = req.body
        if(!busId) return res.json({reason:'busId should not be empty'})
        
    } catch (error) {
        
    }
}