import Subcategory from '../../models/subcategory.js';

// Get all user subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category');
    
    res.status(200).json({
      status: 'success',
      results: subcategories.length,
      data: subcategories
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving subcategories',
      error: error.message,
    });
  }
};

export default getAllSubcategories;