import { Router } from 'express';

import createCategory from '../controllers/categories/createCategory.js';
import getAllCategories from '../controllers/categories/getAllCategories.js';
import getCategory from '../controllers/categories/getCategory.js';
import updateCategory from '../controllers/categories/updateCategory.js';
import deleteCategory from '../controllers/categories/deleteCategory.js';

import auth from '../middlewares/auth.js';

const router = Router();

router
  .route('/')
  .get(auth, getAllCategories)
  .post(auth, createCategory);

router
  .route('/:id')
  .get(auth, getCategory)
  .patch(auth, updateCategory)
  .delete(auth, deleteCategory);

export default router;
