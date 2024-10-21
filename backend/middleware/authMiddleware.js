const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  // Get the token from cookies
  let token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.jwt_secret);

    // Find the user by ID, excluding password
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    // Call next middleware
    next();
  } catch (error) {
    console.error('Token verification failed:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Not authorized, token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    } else {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
};

module.exports = { protect };
