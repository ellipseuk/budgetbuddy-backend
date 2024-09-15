const express = require('express');

const createSubcategory = require('../controllers/subcategories/createSubcategory');
const getAllSubcategories = require('../controllers/subcategories/getAllSubcategories');
const getSubcategory = require('../controllers/subcategories/getSubcategory');
const updateSubcategory = require('../controllers/subcategories/updateSubcategory');
const deleteSubcategory = require('../controllers/subcategories/deleteSubcategory');

const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth, getAllSubcategories)
  .post(auth, createSubcategory);

router
  .route('/:id')
  .get(auth, getSubcategory)
  .patch(auth, updateSubcategory)
  .delete(auth, deleteSubcategory);

module.exports = router;