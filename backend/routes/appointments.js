const express = require('express');
const { body } = require('express-validator');
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getAvailableSlots
} = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const appointmentValidation = [
  body('practitioner')
    .isMongoId()
    .withMessage('Valid practitioner ID is required'),
  body('therapy')
    .isMongoId()
    .withMessage('Valid therapy ID is required'),
  body('scheduledDate')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error('Scheduled date must be in the future');
      }
      return true;
    }),
  body('scheduledTime.start')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  body('scheduledTime.end')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format')
    .custom((endTime, { req }) => {
      const startTime = req.body.scheduledTime?.start;
      if (startTime && endTime <= startTime) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  body('sessionNumber')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Session number must be a positive integer'),
  body('totalSessions')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Total sessions must be a positive integer'),
  body('notes.patient')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Patient notes cannot exceed 500 characters')
];

const updateAppointmentValidation = [
  body('scheduledDate')
    .optional()
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error('Scheduled date must be in the future');
      }
      return true;
    }),
  body('scheduledTime.start')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  body('scheduledTime.end')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format'),
  body('status')
    .optional()
    .isIn(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'])
    .withMessage('Invalid appointment status'),
  body('notes.patient')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Patient notes cannot exceed 500 characters'),
  body('notes.practitioner')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Practitioner notes cannot exceed 500 characters'),
  body('feedback.patientRating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Patient rating must be between 1 and 5'),
  body('feedback.effectiveness')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Effectiveness rating must be between 1 and 5')
];

const cancelValidation = [
  body('reason')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Cancellation reason cannot exceed 200 characters')
];

// Routes
// @route   GET /api/appointments
// @desc    Get appointments for authenticated user
// @access  Private
router.get('/', authenticate, getAppointments);

// @route   GET /api/appointments/available-slots
// @desc    Get available time slots for a practitioner on a specific date
// @access  Private
router.get('/available-slots', authenticate, getAvailableSlots);

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Private
router.get('/:id', authenticate, getAppointmentById);

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Private (Patient)
router.post('/', authenticate, appointmentValidation, createAppointment);

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Private (Patient/Practitioner/Admin)
router.put('/:id', authenticate, updateAppointmentValidation, updateAppointment);

// @route   PUT /api/appointments/:id/cancel
// @desc    Cancel appointment
// @access  Private (Patient/Practitioner/Admin)
router.put('/:id/cancel', authenticate, cancelValidation, cancelAppointment);

module.exports = router;