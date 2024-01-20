import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const AuthSignInRequest = [
  check('email').notEmpty().withMessage('Email is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('email').isLength({ max: 30 }).withMessage('Email must be below 30 characters'),

  check('password').notEmpty().withMessage('Password is required'),
  check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
  check('password').isLength({ max: 8 }).withMessage('Password must be below 8 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default AuthSignInRequest;
