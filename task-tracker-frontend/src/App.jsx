import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Projects from './pages/Projects.jsx';
import CreateProject from './pages/CreateProject.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProjectTasks from './pages/ProjectTasks.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateTask from './pages/CreateTask.jsx';
import UpdateTask from './pages/UpdateTask.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
        <Route path="/projects/create" element={<PrivateRoute><CreateProject /></PrivateRoute>} />
        <Route path="/projects/:projectId/tasks" element={<PrivateRoute><ProjectTasks /></PrivateRoute>} />
        <Route path="/projects/:projectId/tasks/create" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
        <Route path="/projects/:projectId/tasks/update/:taskId" element={<PrivateRoute><UpdateTask /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
