import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({

    avatar: {
        type: String,  
    },
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    yearOfExperience: { 
        type: Number,
        required: false
    }
 }, {
     timestamps: true
})

export const Team = mongoose.model("Team", teamSchema)