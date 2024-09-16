import { Schema, model } from 'mongoose';

// Define the category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category must have a name'],
  },
  description: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Category = model('Category', categorySchema);

export default Category;