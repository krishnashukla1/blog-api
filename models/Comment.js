// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Reference to the Post model (POPULATE)
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema); //
