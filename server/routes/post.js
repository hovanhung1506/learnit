const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require('../models/Post');

//GET Posts
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//POST Post
//Tao bai post
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Missing title' });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('https://') ? url : `https://${url}`,
      status: status || 'TO LEARN',
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//PUT Post
//Cap nhat post

router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Missing title' });
  }
  try {
    let updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO LEARN',
      updatedAt: Date.now(),
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });
    if (!updatedPost) return res.status(401).json({ success: false, message: 'Post not found or user not authorised' });
    res.json({ success: true, message: 'Excellent progress!', post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//DELETE Post
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);
    if (!deletePost) return res.status(401).json({ success: false, message: 'Post not found or user not authorised' });
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//DELETE all post
router.delete('/', verifyToken, async (req, res) => {
  try {
    const deleteAllPost = await Post.deleteMany({ user: req.userId });
    if (!deleteAllPost) return res.status(401).json({ success: false, message: 'Post not found or user not authorised' });
    res.json({ success: true, message: 'All post deleted successfully', total: deleteAllPost.deletedCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
module.exports = router;
