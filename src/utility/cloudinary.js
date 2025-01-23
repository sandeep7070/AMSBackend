import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()  
// log environment variable for debugging 

console.log("Cloudinary Env Variables:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing'
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (loacalFildPath) => {
    try {
         if (!loacalFildPath) return null
         const response = await cloudinary.uploader.upload(loacalFildPath, {
            resource_type: "auto"
         });
         // file upload seccefull !!! 
         console.log("file is upload cloudinary", response.url);
         return response.url
    } catch (error) {
        fs.unlinkSync(loacalFildPath)
        return null
    }
}

export { uploadOnCloudinary }