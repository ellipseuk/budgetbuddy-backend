const express = require('express');

const getAllUsers = require('../controllers/users/getAllUsers');
const createUser = require('../controllers/users/createUser');
const getUser = require('../controllers/users/getUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;