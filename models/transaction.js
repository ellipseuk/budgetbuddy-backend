import { Schema, model } from 'mongoose';

// Define the transaction schema
const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: false,
  },
}, {
  timestamps: true,
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;