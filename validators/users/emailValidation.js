import { body } from 'express-validator';
import { resolveMx } from 'dns';
import disposableDomains from 'disposable-email-domains';

// Syntax validation for email and normalize it
const validateEmailSyntax = body('email')
  .isEmail()
  .withMessage('Please provide a valid email address')
  .normalizeEmail();

// Check if the domain has a valid MX record
const checkMXRecord = (req, res, next) => {
  const email = req.body.email;
  const domain = email.split('@')[1];

  resolveMx(domain, (err, addresses) => {
    if (err || addresses.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid email domain.' 
      });
    }
    next();
  });
};

// Check if the email domain is disposable
const checkDisposableEmail = (req, res, next) => {
  const email = req.body.email;
  const domain = email.split('@')[1];

  if (disposableDomains.includes(domain)) {
    return res.status(400).json({ 
      error: 'Disposable email addresses are not allowed.' 
    });
  }
  next();
};

export default {
    validateEmailSyntax,
    checkMXRecord,
    checkDisposableEmail,
  };