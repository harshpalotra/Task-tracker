import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Project name is required');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, { name }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      alert('Project created successfully!');
      navigate('/projects');
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Failed to create project';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Project
          </button>
        </form>
        <button
          onClick={() => navigate('/projects')}
          className="mt-4 w-full text-sm text-blue-600 hover:underline"
        >
          Back to Projects
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
