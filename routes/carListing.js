const express = require('express');
const Car = require('../models/Car');
const multer = require('multer');
const router = express.Router();

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Create Car Listing
router.post('/cars', upload.array('images'), async (req, res) => {
    try {
        const { title, category, brand, price, description } = req.body;
        const images = req.files.map(file => file.path);
        const car = await Car.create({ ...req.body, images, owner: req.user._id });
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Cars with Filters
router.get('/buy-cars', async (req, res) => {  // Changed app.get to router.get
    try {
        const carsForSale = await Car.find({ status: 'for_sale' }); // Assuming status is 'for_sale'
        res.json(carsForSale);
    } catch (error) {
        res.status(500).send('Error fetching cars for sale');
    }
});

module.exports = router;
