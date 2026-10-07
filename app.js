const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic status check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AI FAQ Assistant API is running.',
    version: '1.0.0',
  });
});

// Register API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Handle Socket.IO polling requests gracefully if client attempts connection
app.use('/socket.io', (req, res) => {
  res.status(404).json({ error: 'Socket.IO not enabled' });
});

// Centralized error handler middleware
app.use(errorHandler);

module.exports = app;