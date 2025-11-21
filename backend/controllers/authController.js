const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken({ id: user._id });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user._id });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const auth = req.auth;

  if (!auth?.userId) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.json({
    userId: auth.userId,
    sessionId: auth.sessionId,
    email: auth.sessionClaims?.email,
  });
});

module.exports = { registerUser, loginUser, getProfile };

