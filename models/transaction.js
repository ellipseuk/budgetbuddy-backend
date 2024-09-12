const mongoose = require('mongoose');

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;