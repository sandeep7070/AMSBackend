import express from 'express';
import {
  createStaff,
  staffLogin,
  getAllStaff,
  updateStaff,
  deleteStaff,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post('/create', createStaff);           // Create Staff
router.post('/login', staffLogin);             // Staff Login
router.get('/', getAllStaff);                  // Get All Staff
router.put('/:id', updateStaff);               // Update Staff by _id
router.delete('/:id', deleteStaff);            // Delete Staff by _id

export default router;
