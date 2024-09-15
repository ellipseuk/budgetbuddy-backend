const Category = require('../../models/category');

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    // Check if category exists and belongs to the user
    if (!category || category.user.toString() !== req.user.id) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found or you do not have access to this category',
        error: message.error,
      });
    }

    res.status(200).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving category',
      error: error.message,
    });
  }
};

module.exports = getCategory;