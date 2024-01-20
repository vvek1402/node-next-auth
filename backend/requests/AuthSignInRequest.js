const { check, validationResult } = require('express-validator');

const AuthSignInRequest = [  
    check('email').notEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('email').isLength({ max: 30 }).withMessage('email must be below 30 characters'),

    check('password').notEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 3 }).withMessage('Password must be at least 4 characters long'),
    check('password').isLength({ max: 8 }).withMessage('Password must be below 8 characters'),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

module.exports = {
    AuthSignInRequest,
};
