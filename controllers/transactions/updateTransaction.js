import Transaction from '../../models/transaction.js';

// Update a transaction
const updateTransaction = async (req, res) => {
  const { amount, type, description } = req.body;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { amount, type, description, updated_at: Date.now() },
      { new: true, runValidators: true }
    );

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
    res.status(400).json({
      status: 'error',
      message: 'Error updating transaction',
      error: err.message,
    });
  }
};

export default updateTransaction;