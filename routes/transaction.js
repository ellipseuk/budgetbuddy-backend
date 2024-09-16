import { Router } from 'express';

import getAllTransactions from '../controllers/transactions/getAllTransactions.js';
import createTransaction from '../controllers/transactions/createTransaction.js';
import getTransaction from '../controllers/transactions/getTransaction.js';
import updateTransaction from '../controllers/transactions/updateTransaction.js';
import deleteTransaction from '../controllers/transactions/deleteTransaction.js';

import auth from '../middlewares/auth.js';

const router = Router();

router
  .route('/')
  .get(auth, getAllTransactions)
  .post(auth, createTransaction);

router
  .route('/:id')
  .get(auth, getTransaction)
  .patch(auth, updateTransaction)
  .delete(auth, deleteTransaction);

export default router;