const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ userId: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);

