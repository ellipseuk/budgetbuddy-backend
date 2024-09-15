const express = require('express');

const getAllTransactions = require('../controllers/transactions/getAllTransactions');
const createTransaction = require('../controllers/transactions/createTransaction');
const getTransaction = require('../controllers/transactions/getTransaction');
const updateTransaction = require('../controllers/transactions/updateTransaction');
const deleteTransaction = require('../controllers/transactions/deleteTransaction');

const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth, getAllTransactions)
  .post(auth, createTransaction);

router
  .route('/:id')
  .get(auth, getTransaction)
  .patch(auth, updateTransaction)
  .delete(auth, deleteTransaction);

module.exports = router;