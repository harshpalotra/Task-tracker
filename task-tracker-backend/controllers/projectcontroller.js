import Project from '../Models/project.js';

export const createProject = async (req, res) => {
    const { name } = req.body;
    const existingProjects = await Project.find({ user: req.user._id });
  
    if (existingProjects.length >= 4) {
      return res.status(400).json({ message: 'You can only create up to 4 projects' });
    }
  
    const project = await Project.create({ name, user: req.user._id });
    res.status(201).json({ success: true, project });
  };
  
