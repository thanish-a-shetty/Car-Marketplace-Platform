const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  mileage: {
    type: String,
    required: true
  },
  engine: {
    type: String,
    required: true
  },
  power: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  seating: {
    type: String,
    required: true
  },
  bootSpace: {
    type: String,
    required: true
  },
  colors: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  statePrices: {
    type: Map,
    of: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema); 