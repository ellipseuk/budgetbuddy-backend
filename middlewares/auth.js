const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;
  
  // Check if token is in the header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Authorization denied, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found, authorization denied' });
    }

    // Set user in req object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token, authorization denied' });
  }
};

module.exports = protect;