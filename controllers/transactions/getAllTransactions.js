const Transaction = require('../../models/transaction');

// Get all transactions
const getAllUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    
    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving transactions',
      error: err.message,
    });
  }
};

module.exports = getAllUserTransactions;