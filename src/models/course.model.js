import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema (
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
            unique: false
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
            default: true
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
        courseImage: {
            type: String,
            requred: true
        },
        domain: {
            type: String,
            required: true
        },
        courseCurriculum: {
            type: String,
            required: true
        },
        eligibilityCriteria: {
            type: String,
            requred: true
        },

},  {
    timestamps: true
})

export const Course = mongoose.model("Course", courseSchema)