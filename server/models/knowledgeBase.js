const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // for clean URLs
  category: { type: String, required: true },

  author: {
    name: { type: String, required: true },
    avatarInitials: { type: String },
    role: { type: String }
  },

  views: { type: Number, default: 0 },

  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },

  tags: [{ type: String }],

  content: { type: String, required: true }, // markdown or raw text

  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
