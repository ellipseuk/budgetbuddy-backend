const express = require('express');

const getAllUsers = require('../controllers/users/getAllUsers');
const createUser = require('../controllers/users/createUser');
const getUser = require('../controllers/users/getUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

// Import the registerUser and loginUser controllers
const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');

// 
const registerValidation = require('../validators/users/registerValidation');
const loginValidation = require('../validators/users/loginValidation');

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

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

module.exports = router;