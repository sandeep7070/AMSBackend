import asyncHandler from '../utility/asyncHandlers.js'

const createCourse = asyncHandler(async  (req, res) => {
    console.log("Course Api hit ")

    const { coursetitle, coursesubject, courseCode, courseDuration, courseFees, active, feesDiscount, minFeesToPay, domain, courseCurriculum, eligibilityCriteria} = req.body
        
    const file = req.file;

    if (!coursetitle || !coursesubject || !courseCode || !courseDuration || !courseFees || !active || !feesDiscount || !minFeesToPay || !domain || !courseCurriculum || !eligibilityCriteria)  {
        return res.status(400).json({
            success: false,
            message: "Missing service details"
        });
    }

    if (condition) {
        
    }

})