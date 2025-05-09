﻿# Task-tracker
 
A full-stack task management app built with the MERN stack (MongoDB, Express, React, Node.js). Users can authenticate, create up to 4 projects, and manage tasks under each project.

task-tracker/
├── task-tracker-frontend/   # React + Vite + Tailwind CSS
├── task-tracker-backend/    # Node.js + Express + MongoDB
└── README.md

⚙️ Prerequisites
Node.js (v18+ recommended)

MongoDB (local or Atlas)

npm (or yarn)

Terminal / Command Prompt
//
How to Run This Project
📌 Run backend first, then frontend.
Create a .env file:
env
PORT=
MONGO_URI=
JWT_SECRET=

1. Start the backend server:
cd task-tracker-frontend
npm install
npm run dev || nodemon

 
 2. Setup Frontend (Client UI)
Open a new terminal and run:
cd task-tracker-frontend
npm install

Create a .env file:
VITE_API_URL=http://localhost:5000
Start the frontend:
npm run dev


 Example API Flow
Register/Login user

Create up to 4 projects

Add, update, delete tasks within each project

All task/project routes are protected and require a valid JWT token



 Tech Stack
Frontend: React, Vite, Tailwind CSS, Axios

Backend: Node.js, Express.js, MongoDB (Mongoose)

Auth: JWT (JSON Web Tokens)

Proxy: Vite Dev Server → Express API

