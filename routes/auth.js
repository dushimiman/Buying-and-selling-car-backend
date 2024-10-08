const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, phoneNumber, role } = req.body; // Include phoneNumber

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ username, email, phoneNumber, password, role }); // Include phoneNumber
    await user.save();

    // Create and send JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Login route
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const payload = { userId: user.id };
      const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

      res.status(200).json({ token, role: user.role, message: 'Login successful' }); // Include role in response
  } catch (error) {
      res.status(500).send('Server error');
  }
});


module.exports = router;
