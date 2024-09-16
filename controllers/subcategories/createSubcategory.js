import Subcategory from '../../models/subcategory.js';

// Create a new subcategory
const createSubcategory = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const subcategory = await Subcategory.create({
      name,
      description,
      category
    });

    res.status(201).json({
      status: 'success',
      data: subcategory
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error creating subcategory'
    });
  }
};

export default createSubcategory;