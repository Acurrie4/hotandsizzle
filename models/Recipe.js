const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  directions: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userName', required: true }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;