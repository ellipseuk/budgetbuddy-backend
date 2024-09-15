const Category = require('../../models/category');

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Find the category
    let category = await Category.findById(req.params.id);
    
    if (!category || category.user.toString() !== req.user.id) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found or you do not have access to this category',
        error: error.message,
      });
    } 

    // Update the category
    category.name = name || category.name;
    category.description = description || category.description;
    category.updated_at = Date.now();
    await category.save();

    res.status(200).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating category',
      error: error.message,
    });
  }
};

module.exports = updateCategory;