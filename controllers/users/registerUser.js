import { validationResult } from 'express-validator';
import User from '../../models/user.js';
import pkg from 'jsonwebtoken';

const { sign } = pkg;

// Register a new user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const user = await User.create({ username, email, password });

    // Generate a token
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};

export default registerUser;