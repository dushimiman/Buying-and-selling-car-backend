const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Set the JSON size limit to 50MB
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
