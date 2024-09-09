const User = require('../../models/user');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error getting user', error: err.message });
  }
};

module.exports = getUser;