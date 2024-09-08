const User = require('../../models/user');

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
};

module.exports = updateUser;