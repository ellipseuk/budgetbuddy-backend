const mongoose = require('mongoose');

// Define the subcategory schema
const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subcategory must have a name'],
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
}, {
  timestamps: true,
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;