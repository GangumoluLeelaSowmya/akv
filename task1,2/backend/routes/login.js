const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password, email, phoneNumber, gender, dateOfBirth } = req.body;

  // Check for missing fields
  if (!username || !password || !email || !phoneNumber || !dateOfBirth) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    const newUser = new User({
      username,
      passwordHash: password,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
    });

    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (isMatch) {
      // Create JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send({ message: 'Login successful', token });
    } else {
      res.status(400).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Example protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).send({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
