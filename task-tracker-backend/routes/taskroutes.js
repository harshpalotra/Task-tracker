import express from 'express';
import { isAuthenticated } from '../middlewares/authmiddlewares.js';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskcontroller.js';

const router = express.Router();

router.post('/:projectId', isAuthenticated, createTask);          // Create Task
router.get('/:projectId', isAuthenticated, getTasks);             // Read Tasks
router.put('/:taskId', isAuthenticated, updateTask);              // Update Task
router.delete('/:taskId', isAuthenticated, deleteTask);          // Delete Task        

export default router;
