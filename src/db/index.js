import mongoose from "mongoose";
import { DB_NAME } from "../utility/constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongoDB Connected Successfully! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB; 