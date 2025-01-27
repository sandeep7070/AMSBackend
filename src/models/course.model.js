import mongoose from "mongoose";

const courseSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            requred: true
        },
        courseCode: {
            type: String,
            unique: true,
        },
        duration: {
            type: String,
            required: true
        },
        courseFees: {
            type: Number,
            required: true
        },
        
        discountendfees: {
            type: Number,
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
        curriculum: {
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

