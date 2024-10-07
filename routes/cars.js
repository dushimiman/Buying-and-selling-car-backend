const express = require('express');
const router = express.Router();
const Car = require('../models/Car'); // Import Car model

// @route   POST /api/cars
// @desc    Submit a car for sale
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newCar = new Car(req.body); // Use Car model to create new entry
    await newCar.save(); // Save to the database
    res.json({ message: 'Car listed for sale successfully', car: newCar });
  } catch (error) {
    res.status(500).json({ error: 'Error saving car details' });
  }
});

// @route   GET /api/cars
// @desc    Get all cars
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find(); // Retrieve all cars from the database
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
