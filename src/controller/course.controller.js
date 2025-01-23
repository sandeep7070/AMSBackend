// course.controller.js
import asyncHandler from '../utility/asyncHandlers.js'
import Course from '../models/course.model.js'
import { uploadOnCloudinary } from '../utility/cloudinary.js'

const createCourse = asyncHandler(async (req, res) => {
    console.log("Course Api hit ");
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const { 
        coursetitle, 
        coursesubject, 
        courseCode, 
        courseDuration, 
        courseFees, 
        active = false, 
        feesDiscount = 0, 
        minFeesToPay, 
        domain, 
        courseCurriculum, 
        eligibilityCriteria
    } = req.body;
        
    const file = req.file;

    // Validate required fields
    if (!coursetitle || !coursesubject || !courseCode || !courseDuration || 
        !courseFees || !minFeesToPay || !domain) {
        return res.status(400).json({
            success: false,
            message: "Missing required course details"
        });
    }

    // Validate file upload
    if (!file) {
        return res.status(400).json({
            success: false,
            message: "Cover image is required!"
        });
    }

    try {
        // Upload file to Cloudinary
        const mycloud = await uploadOnCloudinary(file.path);
        
        // Create new course
        const newCourse = await Course.create({
            coursetitle,
            coursesubject,
            courseCode,
            courseDuration,
            courseFees,
            active,
            feesDiscount,
            minFeesToPay,
            domain,
            courseCurriculum,
            eligibilityCriteria,
            coverImage: mycloud?.url || '',
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully!",
            course: newCourse
        });                                               
    } catch (error) {
        console.error("Course creation error", error);
        res.status(500).json({
            success: false,
            message: "Error creating course",
            error: error.message
        });
    }
});

export { createCourse };