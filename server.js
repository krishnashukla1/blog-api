// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const rateLimit = require("express-rate-limit"); // npm i express-rate-limit

// Load env variables
dotenv.config(); // Load environment variables from .env file

// Connect to DB
connectDB();

const app = express(); // Create an instance of express

// Middleware 
app.use(express.json()); //JSON parser middleware (express.json()) 

//-------------------RATE LIMIT-------------------------------------------

//  Apply rate limiting globally
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter); // Must come before routes   //Rate limiting is configured and applied before routes

//----------------------ROUTES-------------------------------------------

// Routes //Routes are clearly structured and separated.
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
