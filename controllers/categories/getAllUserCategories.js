const Category = require('../../models/category');

// Get all categories that belong to the user
const getAllUserCategories = async (req, res) => {
  try {
    // Find all categories that belong to the user
    const categories = await Category.find({ 
      user: req.user.id 
    });

    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving categories'
    });
  }
};

module.exports = getAllUserCategories;