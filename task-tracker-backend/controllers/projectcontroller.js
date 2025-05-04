import Project from '../Models/project.js';
import Task from '../Models/task.js';
export const createProject = async (req, res) => {
    const { name } = req.body;
    const existingProjects = await Project.find({ user: req.user._id });
  
    if (existingProjects.length >= 4) {
      return res.status(400).json({ message: 'You can only create up to 4 projects' });
    }
  
    const project = await Project.create({ name, user: req.user._id });
    res.status(201).json({ success: true, project });
  };
  

  export const getProjects = async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user._id }).select('name'); 
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching projects', error });
    }
  };


  export const deleteProject = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      // Ensure the project belongs to the logged-in user
      const project = await Project.findOne({ _id: projectId, user: req.user._id });
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }
  
      // Delete associated tasks first
      await Task.deleteMany({ project: projectId });
  
      // Then delete the project
      await project.deleteOne();
  
      res.status(200).json({ message: 'Project and its tasks deleted successfully' });
    } catch (error) {
      console.error('Delete project error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
