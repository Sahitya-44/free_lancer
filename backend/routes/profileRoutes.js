const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Get profile
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/', protect, async (req, res) => {
  try {
    const { name, title, bio, location, availability, profileImage, socialLinks } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        title,
        bio,
        location,
        availability,
        profileImage,
        socialLinks,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Select template
router.put('/template/:templateId', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { selectedTemplate: req.params.templateId },
      { new: true }
    );

    res.json({
      message: 'Template selected successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
