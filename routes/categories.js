const express = require('express');

const createCategory = require('../controllers/categories/createCategory');
const getAllUserCategories = require('../controllers/categories/getAllUserCategories');
const getCategory = require('../controllers/categories/getCategory');
const updateCategory = require('../controllers/categories/updateCategory');
const deleteCategory = require('../controllers/categories/deleteCategory');

const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth, getAllUserCategories)
  .post(auth, createCategory);

router
  .route('/:id')
  .get(auth, getCategory)
  .patch(auth, updateCategory)
  .delete(auth, deleteCategory);

module.exports = router;
