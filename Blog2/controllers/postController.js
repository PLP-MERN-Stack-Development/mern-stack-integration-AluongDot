// controllers/postsController.js
const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// ✅ Get All Posts with filtering/pagination (PUBLIC)
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '', status = '' } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { body: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) filter.category = category;
    if (status) filter.status = status;

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json(posts);
  } catch (err) {
    console.error('❌ Error in getPosts:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Get Single Post (PUBLIC - no auth required)
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Create Post (PROTECTED)
exports.createPost = async (req, res) => {
  try {
    const { title, body, author, category, status } = req.body;

    if (!title || !body || !author || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const post = new Post({
      title,
      body,
      author,
      category,
      status: status || 'draft',
      user: req.user._id,
  image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Update Post (PROTECTED)
exports.updatePost = async (req, res) => {
  try {
    const { title, body, author, category, status } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title || post.title;
    post.body = body || post.body;
    post.author = author || post.author;
    post.category = category || post.category;
    post.status = status || post.status;

    if (req.file) {
      if (post.image) {
        const oldPath = path.join(__dirname, '..', 'uploads', path.basename(post.image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      post.image = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await post.save();
    res.json({ message: '✅ Post updated successfully', post: updatedPost });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: '❌ Failed to update post', error: err.message });
  }
};

// ✅ Delete Post (PROTECTED)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    if (post.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(post.image));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await post.deleteOne();
    res.json({ message: '✅ Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};