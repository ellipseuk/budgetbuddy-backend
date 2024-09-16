import Subcategory from '../../models/subcategory.js';

// Update a subcategory
const updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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
      message: 'Error updating subcategory',
      error: error.message,
    });
  }
};

export default updateSubcategory;