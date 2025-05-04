import express from 'express';
import { isAuthenticated } from '../middlewares/authmiddlewares.js';
import { createProject } from '../controllers/projectcontroller.js';
import { getProjects } from '../controllers/projectcontroller.js';
import { deleteProject } from '../controllers/projectcontroller.js';




const router = express.Router();

router.post('/', isAuthenticated, createProject);
router.get('/', isAuthenticated, getProjects); 
router.delete('/:projectId', isAuthenticated, deleteProject); 


export default router;
