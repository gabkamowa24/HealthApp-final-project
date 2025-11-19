const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) {
    res.status(400);
    throw new Error('Category already exists');
  }
  const category = await Category.create({ name, description });
  res.status(201).json(category);
});

module.exports = { getCategories, createCategory };

