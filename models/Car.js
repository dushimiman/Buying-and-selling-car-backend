const mongoose = require('mongoose');

// Define the Car schema
const carSchema = new mongoose.Schema({
  carBrand: String,
  bodyType: String,
  regYear: String,
  regNumber: String,
  kilometreDriven: Number,
  fuelType: String,
  transmission: String,
  carCondition: String,
  description: String,
  carImages: [String], // Store Base64 encoded images as strings
  fullName: String,
  address: String,
  mobileNumber: String,
  email: String,
});

// Create the Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
