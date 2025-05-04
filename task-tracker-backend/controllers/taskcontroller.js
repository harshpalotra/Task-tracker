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
      const tasks = await Task.find({ project: req.params.projectId });
      res.status(200).json({ tasks });  // Make sure it returns { tasks: [...] }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  };

  export const getTaskById = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const task = await Task.findById(taskId);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

  export const updateTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, status } = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, status },
        { new: true }
      );
  
      if (!updatedTask)
        return res.status(404).json({ message: 'Task not found' });
  
      res.status(200).json({ message: 'Task updated', task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
 export const deleteTask = async (req, res) => {
  const { taskId } = req.params;  // taskId should be passed in the request URL
  
  try {
    const task = await Task.findByIdAndDelete(taskId);  // Find and delete the task by its _id
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

