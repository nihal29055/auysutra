const express = require('express');
const { body } = require('express-validator');
const {
  getTherapies,
  getTherapyById,
  createTherapy,
  updateTherapy,
  deleteTherapy,
  getCategories,
  getTypes,
  searchTherapies,
  getRecommendedTherapies
} = require('../controllers/therapyController');
const { authenticate, practitionerOrAdmin, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const therapyValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Therapy name must be between 2 and 100 characters'),
  body('category')
    .isIn(['Shodhana', 'Shamana', 'Rasayana', 'Satwavajaya', 'Other'])
    .withMessage('Invalid therapy category'),
  body('type')
    .isIn(['Vamana', 'Virechana', 'Basti', 'Nasya', 'Raktamokshana', 'Abhyanga', 'Swedana', 'Shirodhara', 'Akshi Tarpana', 'Karna Purana', 'Other'])
    .withMessage('Invalid therapy type'),
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('duration.session')
    .isInt({ min: 15, max: 480 })
    .withMessage('Session duration must be between 15 and 480 minutes'),
  body('duration.course')
    .isInt({ min: 1, max: 100 })
    .withMessage('Course duration must be between 1 and 100 sessions'),
  body('price.perSession')
    .isFloat({ min: 0 })
    .withMessage('Price per session must be a positive number'),
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Difficulty must be Beginner, Intermediate, or Advanced')
];

const updateTherapyValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Therapy name must be between 2 and 100 characters'),
  body('category')
    .optional()
    .isIn(['Shodhana', 'Shamana', 'Rasayana', 'Satwavajaya', 'Other'])
    .withMessage('Invalid therapy category'),
  body('type')
    .optional()
    .isIn(['Vamana', 'Virechana', 'Basti', 'Nasya', 'Raktamokshana', 'Abhyanga', 'Swedana', 'Shirodhara', 'Akshi Tarpana', 'Karna Purana', 'Other'])
    .withMessage('Invalid therapy type'),
  body('description')
    .optional()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('duration.session')
    .optional()
    .isInt({ min: 15, max: 480 })
    .withMessage('Session duration must be between 15 and 480 minutes'),
  body('duration.course')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Course duration must be between 1 and 100 sessions'),
  body('price.perSession')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per session must be a positive number'),
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Difficulty must be Beginner, Intermediate, or Advanced')
];

// Routes
// @route   GET /api/therapies
// @desc    Get all therapies with pagination and filters
// @access  Public
router.get('/', optionalAuth, getTherapies);

// @route   GET /api/therapies/categories
// @desc    Get all therapy categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/therapies/types
// @desc    Get all therapy types
// @access  Public
router.get('/types', getTypes);

// @route   GET /api/therapies/search
// @desc    Search therapies by text
// @access  Public
router.get('/search', searchTherapies);

// @route   GET /api/therapies/recommended
// @desc    Get recommended therapies for a condition
// @access  Public
router.get('/recommended', getRecommendedTherapies);

// @route   GET /api/therapies/:id
// @desc    Get therapy by ID
// @access  Public
router.get('/:id', getTherapyById);

// @route   POST /api/therapies
// @desc    Create new therapy
// @access  Private (Practitioner/Admin only)
router.post('/', authenticate, practitionerOrAdmin, therapyValidation, createTherapy);

// @route   PUT /api/therapies/:id
// @desc    Update therapy
// @access  Private (Owner/Admin only)
router.put('/:id', authenticate, practitionerOrAdmin, updateTherapyValidation, updateTherapy);

// @route   DELETE /api/therapies/:id
// @desc    Delete therapy (soft delete)
// @access  Private (Owner/Admin only)
router.delete('/:id', authenticate, practitionerOrAdmin, deleteTherapy);

module.exports = router;