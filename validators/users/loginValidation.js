const { check } = require('express-validator');

// Validate user login
const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty()
];

module.exports = loginValidation;