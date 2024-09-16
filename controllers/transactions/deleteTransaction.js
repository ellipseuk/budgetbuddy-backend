import Transaction from '../../models/transaction.js';

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ 
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
      data: null,
      message: 'Transaction deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting transaction',
      error: err.message,
    });
  }
};

export default deleteTransaction;