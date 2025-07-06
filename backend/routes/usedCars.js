const express = require('express');
const router = express.Router();
const UsedCar = require('../models/UsedCar');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all used cars (excluding those listed by the current user if logged in)
router.get('/', async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, fuelType, transmission, condition } = req.query;
    let query = {}; // Show all cars

    // If user is logged in, exclude their own listings
    let userId = null;
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
        query.seller = { $ne: userId }; // Exclude cars where the seller is the current user
      }
    } catch (err) {
      // Invalid token, continue as non-authenticated user
      console.error('Error verifying token in GET /usedCars', err.message);
    }

    if (brand) query.brand = brand;
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (condition) query.condition = condition;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const cars = await UsedCar.find(query)
      .populate('seller', 'username email phone') // Populate seller details
      .sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single used car
router.get('/:id', async (req, res) => {
  try {
    const car = await UsedCar.findById(req.params.id)
      .select('+kilometersRun') // Explicitly select kilometersRun
      .populate('seller', 'username email phone') // Populate seller details
      .populate('buyer', 'username email phone'); // Populate buyer details
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get used cars listed by the logged-in user
router.get('/my-listings', auth, async (req, res) => {
  try {
    const cars = await UsedCar.find({ seller: req.userId })
      .populate('seller', 'username email phone')
      .populate('buyer', 'username email phone')
      .sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new used car listing
router.post('/', auth, async (req, res) => {
  try {
    const car = new UsedCar({
      ...req.body,
      seller: req.userId // Set seller to the logged-in user
    });
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update used car listing
router.put('/:id', auth, async (req, res) => {
  try {
    const car = await UsedCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCar = await UsedCar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('seller', 'username email phone'); // Populate seller on update return
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete used car listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await UsedCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await car.deleteOne(); // Use deleteOne instead of remove
    res.json({ message: 'Car listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 