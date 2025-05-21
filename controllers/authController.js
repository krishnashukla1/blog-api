// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password } = req.body; //ADD name, email, password to body 

  const user = new User({ name, email, password });
  await user.save();
  res.json({ msg: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body; //ADD email, password to body
  if (!email || !password) return res.status(400).json({ msg: 'Please provide email and password' });

  const user = await User.findOne({ email }); // Find user by email
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password with plain text password
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET); // Sign token with userId
  res.json({ token });
};
