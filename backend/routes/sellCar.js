const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UsedCar = require('../models/UsedCar');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/sell-cars');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/sell-car
router.post('/', upload.array('images', 8), async (req, res) => {
  console.log('--- /api/sell-car route HIT ---');
  console.log('BODY:', req.body);
  console.log('FILES:', req.files);
  try {
    const {
      carName,
      brand,
      year,
      price,
      mileage,
      kmRun,
      fuelType,
      transmission,
      owner,
      location,
      description,
      contactNumber,
      email
    } = req.body;

    console.log('Parsed fields:', {
      carName,
      brand,
      year,
      price,
      mileage,
      kmRun,
      fuelType,
      transmission,
      owner,
      location,
      description,
      contactNumber,
      email
    });

    // Collect uploaded image file paths
    const imagePaths = req.files ? req.files.map(f => `/uploads/sell-cars/${f.filename}`) : ['/uploads/default-image.jpg'];
    console.log('Image paths:', imagePaths);

    // Attempt to get user from JWT (if provided)
    let sellerId = null;
    let userObj = null;
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        sellerId = decoded.userId;
        userObj = await User.findById(sellerId);
      }
    } catch (err) {
      // Not authenticated, fallback to dummy user
      sellerId = new mongoose.Types.ObjectId();
    }

    // Compose UsedCar document
    console.log('Preparing UsedCar doc...');
    console.log('sellerId:', sellerId, 'typeof:', typeof sellerId);
    let finalSellerId;
    try {
      finalSellerId = sellerId ? new mongoose.Types.ObjectId(sellerId) : new mongoose.Types.ObjectId();
    } catch (e) {
      finalSellerId = new mongoose.Types.ObjectId();
    }
    const usedCar = new UsedCar({
      title: carName || 'Used Car',
      description: description || '',
      price: price ? Number(price) : 0,
      year: year ? Number(year) : 2020,
      mileage: mileage ? Number(mileage) : 0,
      kilometersRun: kmRun ? Number(kmRun) : 0,
      fuelType: fuelType || 'Petrol',
      transmission: transmission || 'Manual',
      images: imagePaths.length > 0 ? imagePaths : ['/uploads/default-image.jpg'],
      location: location || '',
      features: [],
      condition: 'Good',
      brand: brand || '',
      model: brand || carName || '',
      status: 'available',
      seller: finalSellerId,
      owner: finalSellerId
    });

    // Validate required fields
    if (!usedCar.title || !usedCar.brand || !usedCar.model) {
      throw new Error('Missing required fields: title, brand, or model');
    }

    if (isNaN(usedCar.price) || isNaN(usedCar.year) || isNaN(usedCar.mileage)) {
      throw new Error('Invalid numeric fields: price, year, or mileage');
    }

    console.log('Saving UsedCar to DB...');
    const savedCar = await usedCar.save();
    console.log('Saved car:', savedCar);
    res.status(201).json({ success: true, data: savedCar });
  } catch (error) {
    console.error('Sell car error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error', details: error });
  }
});

module.exports = router;
