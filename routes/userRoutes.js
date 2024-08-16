const express = require('express');
const { createUser, getUsers, confirmEmail } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/confirm-email', confirmEmail);

module.exports = router;