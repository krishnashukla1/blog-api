
// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router(); // Auth routes

router.post('/register', register); // Register user
router.post('/login', login); // Login and return token

module.exports = router;
