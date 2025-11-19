const express = require('express');
const { body } = require('express-validator');
const { getBookmarks, addBookmark, removeBookmark } = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getBookmarks)
  .post([body('topicId').notEmpty().withMessage('topicId is required')], validateRequest, addBookmark);

router.delete('/:topicId', removeBookmark);

module.exports = router;

