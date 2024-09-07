
const Schedule=require('../model/schedule')

exports.manualSchedule = async(req,res) => {

    try {
        const{routeId}=req.body
        const newSchedule= new Schedule(req.body)
        // await newSchedule.save()
     res.json({message:'manual schedule success',data:routeId})   
    } catch (error) {
        console.error(error)
    }
}