// controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  const { text } = req.body; //ADD text to body
  if (!text) return res.status(400).json({ msg: 'Please provide text' });
  const comment = new Comment({ 
    text,
    postId: req.params.postId,
    authorId: req.user.userId, 
  });
  await comment.save();
  res.json(comment);
};

exports.getComments = async (req, res) => { 
  const comments = await Comment.find({ postId: req.params.postId }); // Find comments by postId
  if (!comments) return res.status(404).json({ msg: 'No comments found' });
  res.json(comments);
};

exports.deleteComment = async (req, res) => { // Delete comment
  const comment = await Comment.findById(req.params.id);
  const post = await Post.findById(comment.postId);

  if (
    comment.authorId.toString() !== req.user.userId && // Check if the user is the author of the comment
    post.authorId.toString() !== req.user.userId // Check if the user is the author of the post
  ) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  await comment.remove(); // Remove the comment
  res.json({ msg: 'Comment deleted' });
};
