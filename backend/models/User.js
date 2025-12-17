// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  admissionNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  password: { type: String, required: true }, // Consider hashing passwords
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;


// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized!' });
      }
      req.userId = decoded.id;
      next();
    });
  };
  





