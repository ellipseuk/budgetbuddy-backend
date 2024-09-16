import Transaction from '../../models/transaction.js';

// Get a transaction
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!transaction) {
      return res.status(404).json({
        status: 'fail',
        message: 'Transaction not found',
        error: err.message,
      });
    }

    res.status(200).json({
      status: 'success',
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving transaction',
      error: err.message,
    });
  }
};

export default getTransaction;