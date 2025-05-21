// routes/commentRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  addComment,
  getComments,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router();

router.post('/:postId', protect, addComment); // Add comment // Private
router.get('/:postId', getComments); // List comments // Public
router.delete('/:id', protect, deleteComment); // Delete comment // Private

module.exports = router;
