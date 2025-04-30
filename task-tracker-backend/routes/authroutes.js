import express from 'express';
import {login} from '../controllers/authcontroller.js';
import {signup} from '../controllers/authcontroller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
