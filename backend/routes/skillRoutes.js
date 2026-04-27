const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect } = require('../middleware/auth');

// Get all skills
router.get('/', protect, async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add skill
router.post('/', protect, async (req, res) => {
  try {
    const { name, proficiency } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide skill name' });
    }

    const skill = new Skill({
      userId: req.userId,
      name,
      proficiency: proficiency || 'Intermediate'
    });

    await skill.save();

    res.status(201).json({
      message: 'Skill added successfully',
      skill
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update skill
router.put('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Skill updated successfully',
      skill
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete skill
router.delete('/:id', protect, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
