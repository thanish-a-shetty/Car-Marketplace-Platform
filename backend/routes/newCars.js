const express = require('express');
const router = express.Router();
const NewCar = require('../models/NewCar');
const { adminAuth } = require('../middleware/auth'); // Import adminAuth middleware

// Get all new cars
router.get('/', async (req, res) => {
  try {
    const cars = await NewCar.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single new car
router.get('/:id', async (req, res) => {
  try {
    const car = await NewCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'New car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new car (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const newCar = new NewCar(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a new car (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const car = await NewCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'New car not found' });
    }

    const updatedCar = await NewCar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a new car (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const car = await NewCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'New car not found' });
    }

    await car.deleteOne();
    res.json({ message: 'New car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 