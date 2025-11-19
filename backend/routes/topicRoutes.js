const express = require('express');
const { body } = require('express-validator');
const {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const topicValidators = [
  body('title').notEmpty().withMessage('Title is required'),
  body('summary').notEmpty().withMessage('Summary is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
];

router.route('/').get(getTopics).post(protect, topicValidators, validateRequest, createTopic);

router
  .route('/:id')
  .get(getTopicById)
  .put(protect, topicValidators, validateRequest, updateTopic)
  .delete(protect, deleteTopic);

module.exports = router;

