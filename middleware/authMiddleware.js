// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => { // Middleware to protect routes
  const token = req.headers.authorization?.split(' ')[1]; // Get token from headers
  if (!token) return res.status(401).json({ msg: 'No token' }); // No token provided

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // userId from token is added to req.user
    next(); // Call next middleware
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = protect;
