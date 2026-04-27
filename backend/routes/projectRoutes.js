const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

// Get all projects
router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add project
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, image, technologies, liveLink, githubLink, startDate, endDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide title and description' });
    }

    const project = new Project({
      userId: req.userId,
      title,
      description,
      image,
      technologies,
      liveLink,
      githubLink,
      startDate,
      endDate
    });

    await project.save();

    res.status(201).json({
      message: 'Project added successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update project
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
