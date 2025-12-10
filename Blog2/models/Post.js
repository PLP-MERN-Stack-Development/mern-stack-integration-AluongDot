// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  image: { type: String },
  author: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Post', PostSchema);