const express = require('express');
const { body } = require('express-validator');
const { getCategories, createCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', getCategories);
router.post(
  '/',
  protect,
  [body('name').notEmpty().withMessage('Name is required')],
  validateRequest,
  createCategory
);

module.exports = router;

