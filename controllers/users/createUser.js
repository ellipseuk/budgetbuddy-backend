import User from '../../models/user.js';

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ 
      message: 'Error creating user', 
      error: err.message,
    });
  }
};

export default createUser;