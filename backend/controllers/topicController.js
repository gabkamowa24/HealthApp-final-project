const Topic = require('../models/Topic');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

const buildQuery = ({ q, category, tag }) => {
  const query = {};
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { summary: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
    ];
  }
  if (category) {
    query.category = category;
  }
  if (tag) {
    query.tags = { $in: [tag] };
  }
  return query;
};

const getTopics = asyncHandler(async (req, res) => {
  const query = buildQuery(req.query);
  const topics = await Topic.find(query)
    .populate('category')
    .sort({ createdAt: -1 });
  res.json(topics);
});

const getTopicById = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id).populate('category');
  if (!topic) {
    res.status(404);
    throw new Error('Topic not found');
  }
  res.json(topic);
});

const createTopic = asyncHandler(async (req, res) => {
  const { title, summary, content, category, tags, sources, estimatedReadTime } =
    req.body;

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    res.status(400);
    throw new Error('Provided category does not exist');
  }

  const topic = await Topic.create({
    title,
    summary,
    content,
    category,
    tags,
    sources,
    estimatedReadTime,
  });

  res.status(201).json(topic);
});

const updateTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(404);
    throw new Error('Topic not found');
  }

  Object.assign(topic, req.body);
  await topic.save();

  res.json(topic);
});

const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(404);
    throw new Error('Topic not found');
  }
  await topic.deleteOne();
  res.json({ message: 'Topic deleted' });
});

module.exports = {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
};

