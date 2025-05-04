import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectTasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/api/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load tasks');
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
      alert('Failed to delete task');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
  <div className="flex gap-3">
    <button
      onClick={() => navigate('/projects')}
      className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
    >
      View Project
    </button>
    <button
      onClick={() => navigate(`/projects/${projectId}/tasks/create`)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
    >
      + New Task
    </button>
  </div>
</div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Created At</th>
                <th className="p-3 border">Completed At</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50 text-gray-800 text-sm">
                  <td className="p-3 border">{task.title}</td>
                  <td className="p-3 border">{task.description}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-medium whitespace-nowrap ${task.status === 'completed'
                          ? 'bg-green-500'
                          : task.status === 'in progress'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}
                    >
                      {task.status || 'pending'}
                    </span>

                  </td>
                  <td className="p-3 border">{formatDate(task.createdAt)}</td>
                  <td className="p-3 border">
                    {task.status?.toLowerCase() === 'completed' ? formatDate(task.completedAt) : '—'}
                  </td>
                  <td className="p-3 border">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/projects/${projectId}/tasks/update/${task._id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded shadow"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectTasks;
