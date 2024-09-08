const User = require('../../models/user');

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = deleteUser;