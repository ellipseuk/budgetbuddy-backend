const Category = require('../../models/category');

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    // Find the category
    const category = await Category.findById(req.params.id);
    if (!category || category.user.toString() !== req.user.id) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found or you do not have access to this category',
        error: error.message,
      });
    }

    // Delete the category
    await Category.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting category',
      error: error.message,
    });
  }
};

module.exports = deleteCategory;