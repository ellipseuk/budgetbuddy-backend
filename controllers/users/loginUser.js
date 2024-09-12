const { validationResult } = require('express-validator');
const User = require('../../models/user');

// Login a user
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginUser;