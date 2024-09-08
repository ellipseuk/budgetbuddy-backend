const User = require('../../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error getting users', error: err.message });
  }
};

module.exports = getAllUsers;