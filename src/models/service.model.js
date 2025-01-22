import mongoose from "mongoose";

// service schema
const serviceSchema = new mongoose.Schema({

    title: {
        type: String,      
        required: true,    
        trim: false        
    },
    avtar: {
        type: String,      
        required: true
    },
    description: {
        type: String,      
        required: true,    
        trim: false        
    }, 

}, {
     timestamps: true 
    }  
);

export const Service = mongoose.model("Service", serviceSchema)