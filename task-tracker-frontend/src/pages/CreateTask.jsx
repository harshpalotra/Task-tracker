import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/projects/${projectId}/tasks`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
          withCredentials: true, // Optional, if you use cookies/session too
        }
      );
      console.log('Task Created:', res.data);
      navigate(`/projects/${projectId}/tasks`);
      
    } catch (error) {
      console.error(error);
      alert('Failed to add task');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
