// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js')

// router logic will go here - will be built later on in the lab

router.get('/', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render('ingredients/index.ejs', { ingredients });
});

router.get('/new', (req, res) => {
  res.render('ingredients/new');
});

router.post('/', async (req, res) => {
  await Ingredient.create({ name: req.body.name });
  res.redirect('/ingredients');
});

router.get('/:ingredientId', async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.ingredientId);
  res.render('ingredients/show.ejs', { ingredient });
});

module.exports = router;
