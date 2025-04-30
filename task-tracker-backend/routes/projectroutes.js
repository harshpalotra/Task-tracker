import express from 'express';
import { isAuthenticated } from '../middlewares/authmiddlewares.js';
import { createProject } from '../controllers/projectcontroller.js';


const router = express.Router();

router.post('/', isAuthenticated, createProject);


export default router;
