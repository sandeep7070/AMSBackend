import asyncHandler from '../utility/asyncHandlers.js'
import Course from '../models/course.model.js'
import { uploadOnCloudinary } from '../utility/cloudinary.js'
import { error } from 'console';

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
        active , 
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

    let mycloud;
    try {
        mycloud = await uploadOnCloudinary(file)
    } catch (cloudinaryError) {
        console.error('Cloudinary not upload', cloudinaryError);
        return res.status(500).json({
            success: false,
            message: "Failed to upload image to Cloudinary",
            error: cloudinaryError.message
        })
    }

    console.log(mycloud)

    try {
        mycloud = await uploadOnCloudinary(file)

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
            message: "Service created successfully!!",
            Course: {
                coursetitle: newCourse.coursetitle,
                coursesubject: newCourse.coursesubject,
                courseCode: newCourse.courseCode,
                courseDuration: newCourse.courseDuration,
                courseFees: newCourse.courseFees,
                active: newCourse.active,
                feesDiscount: newCourse.feesDiscount,
                minFeesToPay: newCourse.minFeesToPay,
                domain: newCourse.minFeesToPay,
                courseCurriculum: newCourse.courseCurriculum,
                eligibilityCriteria: newCourse.eligibilityCriteria,
                coverImage: newCourse.coverImage
            }
        });
    } catch (error) {
        console.error("Course creation error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating course",
            error: error.message
        });
    }
});    

export { createCourse };