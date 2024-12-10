const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth'); // Import auth routes
const productRoutes = require('./routes/products'); // Import product routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (index.html)

// Routes
app.use('/auth', authRoutes); // Register /auth routes
app.use('/products', productRoutes); // Register /products routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});
