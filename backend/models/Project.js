const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide project description']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  technologies: [{
    type: String,
    trim: true
  }],
  liveLink: String,
  githubLink: String,
  startDate: Date,
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
