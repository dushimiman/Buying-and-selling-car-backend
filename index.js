const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { sendCarRequestEmail } = require('./controllers/EmailController');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.post('/api/sendEmail', sendCarRequestEmail);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
