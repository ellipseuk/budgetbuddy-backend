const Subcategory = require('../../models/subcategory');

const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Subcategory not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting subcategory',
      error: error.message,
    });
  }
};

module.exports = deleteSubcategory;