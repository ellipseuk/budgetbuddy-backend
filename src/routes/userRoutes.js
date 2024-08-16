const express = require('express');
const { createUser, getUsers, confirmEmail, loginUser, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.get('/users', getUsers);
router.get('/confirm-email', confirmEmail);

module.exports = router;