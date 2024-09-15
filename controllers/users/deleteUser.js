const User = require('../../models/user');

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found',
      });
    }

    res.status(200).json({ 
      status: 'success', 
      data: null });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

module.exports = deleteUser;