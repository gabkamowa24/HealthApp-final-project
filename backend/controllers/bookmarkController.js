const Bookmark = require('../models/Bookmark');
const Topic = require('../models/Topic');
const asyncHandler = require('../utils/asyncHandler');

const ensureUser = (req) => {
  const userId = req.auth?.userId;
  if (!userId) {
    throw new Error('User context missing');
  }
  return userId;
};

const getBookmarks = asyncHandler(async (req, res) => {
  const userId = ensureUser(req);
  const bookmarks = await Bookmark.find({ userId }).populate({
    path: 'topic',
    populate: { path: 'category' },
  });
  res.json(bookmarks.map((bookmark) => bookmark.topic));
});

const addBookmark = asyncHandler(async (req, res) => {
  const userId = ensureUser(req);
  const { topicId } = req.body;
  const topic = await Topic.findById(topicId);
  if (!topic) {
    res.status(404);
    throw new Error('Topic not found');
  }
  await Bookmark.create({ userId, topic: topicId });
  res.status(201).json({ message: 'Topic bookmarked' });
});

const removeBookmark = asyncHandler(async (req, res) => {
  const userId = ensureUser(req);
  const { topicId } = req.params;
  await Bookmark.findOneAndDelete({ userId, topic: topicId });
  res.json({ message: 'Bookmark removed' });
});

module.exports = { getBookmarks, addBookmark, removeBookmark };

