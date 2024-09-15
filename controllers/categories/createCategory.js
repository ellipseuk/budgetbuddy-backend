const Category = require('../../models/category');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description,
      user: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error creating category',
      error: error.message,
    });
  }
};

module.exports = createCategory;