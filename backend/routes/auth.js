const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getPractitioners,
  deactivateAccount
} = require('../controllers/authController');
const { authenticate, rateLimiter } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('phone')
    .matches(/^[\+]?[\d\s\-\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('age')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120'),
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('role')
    .optional()
    .isIn(['patient', 'practitioner'])
    .withMessage('Role must be patient or practitioner')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[\d\s\-\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('age')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Routes
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', 
  rateLimiter(15 * 60 * 1000, 5), // 5 attempts per 15 minutes
  registerValidation, 
  register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', 
  rateLimiter(15 * 60 * 1000, 10), // 10 attempts per 15 minutes
  loginValidation, 
  login
);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authenticate, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticate, updateProfileValidation, updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', 
  authenticate, 
  rateLimiter(15 * 60 * 1000, 3), // 3 attempts per 15 minutes
  changePasswordValidation, 
  changePassword
);

// @route   GET /api/auth/practitioners
// @desc    Get all practitioners
// @access  Public
router.get('/practitioners', getPractitioners);

// @route   PUT /api/auth/deactivate
// @desc    Deactivate user account
// @access  Private
router.put('/deactivate', authenticate, deactivateAccount);

module.exports = router;