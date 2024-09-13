const User = require('../../models/user');

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found',
        error: err.message,
      });
    }

    res.status(200).json({ 
      status: 'success', 
      data: null });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error deleting user', 
      error: err.message,
    });
  }
};

module.exports = deleteUser;