import express from 'express';
import { isAuthenticated } from '../middlewares/authmiddlewares.js';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskcontroller.js';

const router = express.Router({ mergeParams: true }); // ✅


router.post('/', isAuthenticated, createTask);        
router.get('/', isAuthenticated, getTasks);  
router.get('/:taskId', isAuthenticated, getTaskById);         
router.put('/:taskId', isAuthenticated, updateTask);  
router.delete('/:taskId', isAuthenticated, deleteTask);           

export default router;
