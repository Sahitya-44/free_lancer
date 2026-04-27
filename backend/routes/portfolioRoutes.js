const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');

// Get public portfolio
router.get('/:portfolioUrl', async (req, res) => {
  try {
    const user = await User.findOne({ portfolioUrl: req.params.portfolioUrl });
    
    if (!user) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const skills = await Skill.find({ userId: user._id });
    const projects = await Project.find({ userId: user._id });
    const experiences = await Experience.find({ userId: user._id }).sort({ startDate: -1 });

    res.json({
      user: {
        name: user.name,
        title: user.title,
        bio: user.bio,
        profileImage: user.profileImage,
        location: user.location,
        availability: user.availability,
        socialLinks: user.socialLinks,
        selectedTemplate: user.selectedTemplate,
        portfolioUrl: user.portfolioUrl
      },
      skills,
      projects,
      experiences
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
