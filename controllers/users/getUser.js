const User = require('../../models/user');

// Get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found',
        error: err.message, 
      });
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error getting user', 
      error: err.message,
    });
  }
};

module.exports = getUser;