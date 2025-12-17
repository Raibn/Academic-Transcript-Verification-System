// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const User = require('./models/User'); // Import the User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Academic Transcript Management System API');
});


// User Registration Route
app.post('/register', async (req, res) => {
    const { admissionNumber, firstName, middleName, lastName, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ admissionNumber });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        admissionNumber,
        firstName,
        middleName,
        lastName,
        password: hashedPassword
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
  });
  


// User Registration Route
app.post('/register', async (req, res) => {
    const { admissionNumber, firstName, middleName, lastName, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ admissionNumber });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        admissionNumber,
        firstName,
        middleName,
        lastName,
        password: hashedPassword
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
  });
  






