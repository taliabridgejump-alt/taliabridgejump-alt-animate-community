const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectData: {
    type: Object,
    default: {}
  },
  characters: [{
    id: String,
    name: String,
    imageUrl: String,
    position: Object
  }],
  scenes: [{
    id: String,
    duration: Number,
    characters: Array,
    voiceover: {
      text: String,
      voice: String,
      audioUrl: String
    },
    background: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
