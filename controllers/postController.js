// controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {  
  const post = new Post({ ...req.body, authorId: req.user.userId }); //ADD authorId to body
  if (!post.title || !post.content) {
    return res.status(400).json({ msg: 'Please provide title and content' });
  }
  await post.save();
  res.json(post);
};

exports.getAllPosts = async (req, res) => { // Get all posts with pagination
  const posts = await Post.find().limit(10).skip(0);
  res.json(posts);
};

exports.getSinglePost = async (req, res) => {  // Get single post by ID
  const post = await Post.findById(req.params.id);
  res.json(post);
};

exports.updatePost = async (req, res) => { // Update post by ID
    const { title, content } = req.body; //ADD title, content to body   
    if (!title || !content) {
        return res.status(400).json({ msg: 'Please provide title and content' });
        }
  const post = await Post.findById(req.params.id); // Find post by ID
  if (!post) return res.status(404).json({ msg: 'Post not found' });
  if (post.authorId.toString() !== req.user.userId) // Check if the user is the author of the post
    return res.status(403).json({ msg: 'Unauthorized' });

  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => { // Delete post by ID
  const post = await Post.findById(req.params.id); // Find post by ID
  if (post.authorId.toString() !== req.user.userId)
    return res.status(403).json({ msg: 'Unauthorized' });

  await post.remove();
  res.json({ msg: 'Post deleted' });
};

// Search posts by keyword in title or content
exports.searchPosts = async (req, res) => {
  try {
    const keyword = req.query.keyword; // Get keyword from query
    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const posts = await Post.find({ // Find posts with keyword in title or content
      $or: [ 
        { title: { $regex: keyword, $options: "i" } }, // title and content are case-insensitive
        { content: { $regex: keyword, $options: "i" } } 
      ]
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Filter posts by tag
exports.filterPostsByTag = async (req, res) => { // Filter posts by tag
  try {
    const tag = req.query.tag; // Get tag from query
    if (!tag) {
      return res.status(400).json({ message: "Tag is required" });
    }

    const posts = await Post.find({ tags: { $in: [tag] } }); // Find posts with tag

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
