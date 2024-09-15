const express = require('express');

const createCategory = require('../controllers/categories/createCategory');
const getAllCategories = require('../controllers/categories/getAllCategories');
const getCategory = require('../controllers/categories/getCategory');
const updateCategory = require('../controllers/categories/updateCategory');
const deleteCategory = require('../controllers/categories/deleteCategory');

const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth, getAllCategories)
  .post(auth, createCategory);

router
  .route('/:id')
  .get(auth, getCategory)
  .patch(auth, updateCategory)
  .delete(auth, deleteCategory);

module.exports = router;
