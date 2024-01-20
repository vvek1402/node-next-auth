const { check, validationResult } = require('express-validator');

const AuthSignUpRequest = [  
    check('email').notEmpty().withMessage('Email is required'),
    check('email').isLength({ min: 30 }).withMessage('Password must be below 30 characters'),
    check('email').isEmail().withMessage('Invalid email address'),

    check('username').notEmpty().withMessage('USername is required'),
    check('username').isLength({ max: 8 }).withMessage('username must be below 8 characters'),

    check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    check('password').notEmpty().withMessage('Password is required'),
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
  AuthSignUpRequest,
};
