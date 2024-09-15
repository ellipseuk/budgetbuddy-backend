const Subcategory = require('../../models/subcategory');

// Get user subcategory by id
const getSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate('category');
    if (!subcategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Subcategory not found',
        error: error.message,
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: subcategory
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving subcategory',
      error: error.message,
    });
  }
};

module.exports = getSubcategory;