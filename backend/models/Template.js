const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  templateId: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  preview: String,
  color: String,
  features: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Template', templateSchema);
