const User = require('../../models/user');

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
        error: err.message,
      });
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating user',
      error: err.message,
    });
  }
};

module.exports = updateUser;