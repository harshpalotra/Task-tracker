// src/components/UpdateTask.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
  const { projectId, taskId } = useParams();
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setTask(res.data.task);
    } catch (error) {
      alert('Failed to fetch task');
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/tasks/${taskId}`, task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      alert('Task updated');
      navigate(`/projects/${projectId}/tasks`);
    } catch (error) {
      alert('Failed to update task');
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl mb-4">Update Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
        />
        <select name="status" value={task.status} onChange={handleChange} className="w-full border p-2">
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
