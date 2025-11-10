const express = require('express');
const router = express.Router();
const Recipe = require('../recipemodel');

// GET /api/        -> list all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// POST /api/       -> add recipe
router.post('/', async (req, res) => {
  try {
    const { name, ingredients, instructions, category, time } = req.body;
    // Ensure ingredients is an array
    const ingr = Array.isArray(ingredients)
      ? ingredients
      : (typeof ingredients === 'string' && ingredients.length) ? ingredients.split(',').map(s => s.trim()) : [];

    const newRecipe = new Recipe({ name, ingredients: ingr, instructions, category, time });
    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully!', recipe: newRecipe });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add recipe' });
  }
});

// DELETE /api/:id  -> delete recipe by id
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
