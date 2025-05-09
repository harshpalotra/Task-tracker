import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authroutes.js';
import projectRoutes from './routes/projectroutes.js';
import taskRoutes from './routes/taskroutes.js';



import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://task-tracker-bfhu.vercel.app',  // 👈 Replace with your actual deployed frontend URL
  credentials: true
}));


app.use(cookieParser());

app.use('/api/auth', authRoutes);       
app.use('/api/projects', projectRoutes); 
app.use('/api/projects/:projectId/tasks', taskRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

