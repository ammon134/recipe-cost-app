const express = require('express');

const { Ingredient, SUPPORTED_UNITS } = require('../models/IngredientModel.js');

const indexRouter = express.Router();
indexRouter.use(express.json());
indexRouter.use(express.urlencoded({ extended: true }));

// Render Home page
indexRouter.get('/', async (req, res) => {
  if (!req.user) {
    res.flash('error', 'Please login to use the application.');
    return res.redirect('/users/login');
  }
  const ingredients = await Ingredient.find({ user: req.user._id }).sort({
    name: 1,
  });

  res.render('index', {
    title: 'Home',
    template: '../index',
    envName: process.env.ENV_NAME,
    user: req.user,
    ingredients,
    SUPPORTED_UNITS,
  });
});

module.exports = {
  indexRouter,
};
