const Transaction = require('../../models/transaction');

// Create a transaction
const createTransaction = async (req, res) => {
  const { amount, type, description } = req.body;

  try {
    const newTransaction = await Transaction.create({
      amount,
      type,
      description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      user: req.user.id,
    });
    
    res.status(201).json({
      status: 'success',
      data: newTransaction,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Error creating transaction',
      error: err.message,
    });
  }
};

module.exports = createTransaction;