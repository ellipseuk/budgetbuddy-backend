const express = require('express');

const getAllTransactions = require('../controllers/transactions/getAllTransactions');
const createTransaction = require('../controllers/transactions/createTransaction');
const getTransaction = require('../controllers/transactions/getTransaction');
const updateTransaction = require('../controllers/transactions/updateTransaction');
const deleteTransaction = require('../controllers/transactions/deleteTransaction');

const router = express.Router();

router
  .route('/')
  .get(getAllTransactions)
  .post(createTransaction);

router
  .route('/:id')
  .get(getTransaction)
  .patch(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;