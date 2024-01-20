import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const AuthSignUpRequest = [
  check('email').notEmpty().withMessage('Email is required'),
  check('email').isLength({ max: 30 }).withMessage('Email must be below 30 characters'),
  check('email').isEmail().withMessage('Invalid email address'),

  check('username').notEmpty().withMessage('Username is required'),
  check('username').isLength({ max: 8 }).withMessage('Username must be below 8 characters'),

  check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  check('password').notEmpty().withMessage('Password is required'),
  check('password').isLength({ max: 8 }).withMessage('Password must be below 8 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default AuthSignUpRequest;
