import Task from '../Models/task.js';
import Project from '../Models/project.js';

export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = new Task({
      title,
      description,
      status: status || 'pending',
      project: projectId,
      user: req.user._id,
    });

    await task.save();
    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId, user: req.user._id });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user._id },
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.status(200).json({ message: 'Task updated', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: req.user._id });

    if (!deletedTask) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
