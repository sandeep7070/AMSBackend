import mongoose from "mongoose";

const courseSchema = new mongoose.Schema (
    {
        coursetitle: {
            type: String,
            required: true
        },
        coursesubject: {
            type: String,
            requred: true
        },
        courseCode: {
            type: String,
            requred: true,
            
        },
        courseDuration: {
            type: String,
            required: true
        },
        courseFees: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
        },
        feesDiscount: {
            type: Number,
            default: 0,
            min: 0,
            max: 200
        },
        minFeesToPay: {
            type: Number,
            requred: true
        },
        coverImage: {
            type: String,  // clodinary
        },
        domain: {
            type: String,
            required: true
        },
        courseCurriculum: {
            type: String,
            required: false
        },
        eligibilityCriteria: {
            type: String,
            requred: false
        },

},  {
    timestamps: true
})

 const Course = mongoose.model("Course", courseSchema)

  export default  Course;

