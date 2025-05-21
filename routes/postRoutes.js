
// routes/postRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  searchPosts,
  filterPostsByTag
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getAllPosts); // Public
router.get('/:id', getSinglePost); // Public
router.post('/', protect, createPost); // Private
router.put('/:id', protect, updatePost); // Private
router.delete('/:id', protect, deletePost); // Private

router.get("/search/posts", searchPosts);
router.get("/filter/posts", filterPostsByTag);

module.exports = router;
