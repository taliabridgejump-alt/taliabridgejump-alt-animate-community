const Project = require('../models/Project');

// Get all user projects
exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId })
      .sort({ updatedAt: -1 });
    
    res.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check ownership
    if (project.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }
    
    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { title, projectData, characters, scenes } = req.body;
    
    const project = new Project({
      title,
      projectData,
      characters,
      scenes,
      userId: req.userId
    });
    
    await project.save();
    
    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check ownership
    if (project.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }
    
    const { title, projectData, characters, scenes } = req.body;
    
    if (title) project.title = title;
    if (projectData) project.projectData = projectData;
    if (characters) project.characters = characters;
    if (scenes) project.scenes = scenes;
    
    await project.save();
    
    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check ownership
    if (project.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }
    
    await project.deleteOne();
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
