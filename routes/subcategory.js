import { Router } from 'express';

import createSubcategory from '../controllers/subcategories/createSubcategory.js';
import getAllSubcategories from '../controllers/subcategories/getAllSubcategories.js';
import getSubcategory from '../controllers/subcategories/getSubcategory.js';
import updateSubcategory from '../controllers/subcategories/updateSubcategory.js';
import deleteSubcategory from '../controllers/subcategories/deleteSubcategory.js';

import auth from '../middlewares/auth.js';

const router = Router();

router
  .route('/')
  .get(auth, getAllSubcategories)
  .post(auth, createSubcategory);

router
  .route('/:id')
  .get(auth, getSubcategory)
  .patch(auth, updateSubcategory)
  .delete(auth, deleteSubcategory);

export default router;