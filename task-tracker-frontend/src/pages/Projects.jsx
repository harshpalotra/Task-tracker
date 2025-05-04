import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Fetch all projects for the logged-in user
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setProjects(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to load projects');
    }
  };

  // Delete a specific project
 const deleteProject = async (projectId) => {
  console.log('Deleting project with ID:', projectId);
  const confirmDelete = window.confirm('Are you sure you want to delete this project?');

  if (!confirmDelete) return;

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    // Update local state to remove deleted project
    setProjects((prevProjects) => prevProjects.filter((p) => p._id !== projectId));

    alert('Project deleted successfully.');
  } catch (error) {
    console.error('Delete project error:', error);
    alert('Failed to delete project. Please try again.');
  }
};

  
  // Fetch projects on initial render
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Projects</h2>
          <button
            onClick={() => navigate('/projects/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + New Project
          </button>
        </div>

        <ul className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            projects.map((project) => (
              <li
                key={project._id}
                className="flex justify-between items-center border p-4 rounded-md shadow-sm hover:shadow-md"
              >
                <Link
                  to={`/projects/${project._id}/tasks`}
                  className="text-lg font-medium text-blue-700 hover:underline"
                >
                  {project.name}
                </Link>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
