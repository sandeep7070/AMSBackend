import { Router } from "express";
import { upload } from '../middleware/multer.middleware.js'
import { createCourse } from "../controller/course.controller.js";

const router = Router();

// Error handling middleware for file upload
router.post('/create-course', 
  (req, res, next) => {
    upload.single('coverImage')(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || 'File upload error'
        });
      }
      next();
    });
  }, 
  createCourse
);

export default router;