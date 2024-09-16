import { check } from 'express-validator';

// Validate user login
const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty()
];

export default loginValidation;