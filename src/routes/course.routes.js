import { Router } from "express";
import { upload } from '../middleware/multer.middleware.js'
import { createCourse } from "../controller/course.controller.js";

const router = Router();

// Error handling middleware for file upload
router.post('/Create', upload.single('coverImage'), createCourse);


export default router;