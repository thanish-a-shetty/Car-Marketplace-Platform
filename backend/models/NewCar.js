const mongoose = require('mongoose');

const newCarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true }, // Base price
  statePrices: { // Prices by state
    type: Map,
    of: String
  },
  mileage: { type: String },
  engine: { type: String },
  power: { type: String },
  transmission: { type: String },
  fuelType: { type: String },
  seating: { type: String },
  bootSpace: { type: String },
  groundClearance: { type: String },
  colors: [String],
  features: [String],
  images: [String], // Array of image URLs
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewCar', newCarSchema); 