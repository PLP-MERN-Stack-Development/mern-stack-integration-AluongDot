const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const Post = require('../models/Post');

// Update post
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, body, status } = req.body;
    const updateData = { title, body, status };
  if (req.file) updateData.image = `uploads/${req.file.filename}`;

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;