// models/Skill.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


skillSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill; 
