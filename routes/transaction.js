const express = require('express');

const getAllTransactions = require('../controllers/transactions/getAllTransactions');
const createTransaction = require('../controllers/transactions/createTransaction');
const getTransaction = require('../controllers/transactions/getTransaction');
const updateTransaction = require('../controllers/transactions/updateTransaction');
const deleteTransaction = require('../controllers/transactions/deleteTransaction');

const protect = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllTransactions)
  .post(protect, createTransaction);

router
  .route('/:id')
  .get(protect, getTransaction)
  .patch(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;