import { Schema, model } from 'mongoose';

// Define the subcategory schema
const subcategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Subcategory must have a name'],
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, {
  timestamps: true,
});

const Subcategory = model('Subcategory', subcategorySchema);

export default Subcategory;