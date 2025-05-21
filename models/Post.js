// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String], // Array of strings
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
