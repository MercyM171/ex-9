const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], default: [] },
  instructions: { type: String, default: '' },
  category: { type: String, default: 'General' },
  time: { type: String, default: '' }, // e.g. "20 minutes"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
