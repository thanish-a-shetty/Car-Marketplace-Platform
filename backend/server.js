// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

console.log('Starting server setup...');

// Load environment variables
dotenv.config();
console.log('Environment variables loaded.');

// Create Express app
const app = express();
console.log('Express app created.');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created.');
} else {
  console.log('Uploads directory exists.');
}

// Middleware
console.log('Setting up middleware...');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('Middleware setup complete.');

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect('mongodb://localhost:27017/UIUX', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully.');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
console.log('Defining routes...');
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sell-car', require('./routes/sellCar'));
app.use('/api/used-cars', require('./routes/usedCars'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the website from your phone using: http://<your-computer-ip>:${PORT}`);
});