import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/index.js';  


dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware manage 
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN, 
 'http://localhost:5173',

    'http://localhost:5174',
     // Your local development client
     'http://localhost:5173/'
  ],
  credentials: true // Important for handling cookies across origins
}))


app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());


/// import routes 
import serviceRouter from './src/routes/service.routes.js'
import courseRouter from './src/routes/course.routes.js'
import teamRouter from './src/routes/team.routes.js'
import blogRouter  from './src/routes/blog.routes.js'
import authRouter from "./src/routes/auth.routes.js"


// Route Setup  User API 
app.use("/api/v1", serviceRouter);
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/team", teamRouter)
app.use("/api/v1/blog", blogRouter)
app.use("/api/auth",authRouter)




// Database connection  servic manage 
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });



