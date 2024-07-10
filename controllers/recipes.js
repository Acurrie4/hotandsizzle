const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET recipes by userID
router.get('/user/:userID', async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.params.userID });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new recipe
router.post('/new', async (req, res) => {
  try {
    const { name, description, ingredients, directions, userId } = req.body;
    
    // Validate required fields
    if (!name || !description || !ingredients || !directions || !userId) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newRecipe = new Recipe({ name, description, ingredients, directions, userId });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ msg: 'Failed to create recipe', error: error.message });
  }
});

// PUT update a specific recipe by ID
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (req.body.name) recipe.name = req.body.name;
    if (req.body.description) recipe.description = req.body.description;
    if (req.body.ingredients) recipe.ingredients = req.body.ingredients;
    if (req.body.directions) recipe.directions = req.body.directions;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete recipe by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ status: 404, msg: 'Recipe not found' });
    }
    res.json({ status: 200, msg: 'Recipe deleted', recipe: deletedRecipe });
  } catch (error) {
    console.error(`Error deleting recipe with ID ${req.params.id}:`, error);
    res.status(500).json({ status: 500, msg: 'Failed to delete recipe', error: error.message });
  }
});

module.exports = router;