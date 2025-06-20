// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab

router.get('/', async (req, res) => {
    const recipes = await Recipe.find();
    res.render('recipes/index.ejs', { recipes });
});

router.get('/new', async (req, res) => {
    const ingredients = await Ingredient.find();
    res.render('recipes/new.ejs', { ingredients });
});

router.post('/create', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    req.body.owner = currentUser;
    await Recipe.create(req.body);
    res.redirect('/recipes');
});

router.get('/:recipeId', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
    res.render('recipes/show.ejs', { recipe });
});

router.delete('/:recipeId', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect('/recipes');
});

router.put('/:recipeId', async (req, res) => {
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
    res.redirect(`/${req.params.recipeId}`);
});

module.exports = router;
