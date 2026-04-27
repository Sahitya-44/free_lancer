const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect } = require('../middleware/auth');

// Get all experiences
router.get('/', protect, async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.userId }).sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add experience
router.post('/', protect, async (req, res) => {
  try {
    const { company, role, description, startDate, endDate, currentlyWorking } = req.body;

    if (!company || !role || !startDate) {
      return res.status(400).json({ message: 'Please provide required fields' });
    }

    const experience = new Experience({
      userId: req.userId,
      company,
      role,
      description,
      startDate,
      endDate,
      currentlyWorking
    });

    await experience.save();

    res.status(201).json({
      message: 'Experience added successfully',
      experience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update experience
router.put('/:id', protect, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Experience updated successfully',
      experience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete experience
router.delete('/:id', protect, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
