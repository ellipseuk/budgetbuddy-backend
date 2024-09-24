import { Router } from 'express';

import getAllUsers from '../controllers/users/getAllUsers.js';
import createUser from '../controllers/users/createUser.js';
import getUser from '../controllers/users/getUser.js';
import updateUser from '../controllers/users/updateUser.js';
import deleteUser from '../controllers/users/deleteUser.js';

// Import the registerUser and loginUser controllers
import registerUser from '../controllers/users/registerUser.js';
import loginUser from '../controllers/users/loginUser.js';

//
import registerValidation from '../validators/users/registerValidation.js';
import loginValidation from '../validators/users/loginValidation.js';
import { 
  validateEmailSyntax, 
  checkMXRecord, 
  checkDisposableEmail } from '../validators/users/emailValidation.js';

const router = Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

router.post('/register', [validateEmailSyntax, checkMXRecord, checkDisposableEmail], registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

export default router;