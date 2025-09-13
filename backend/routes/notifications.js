const express = require('express');
const { body } = require('express-validator');
const {
  getNotifications,
  getNotificationById,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getNotificationStats
} = require('../controllers/notificationController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const notificationValidation = [
  body('recipient')
    .isMongoId()
    .withMessage('Valid recipient ID is required'),
  body('type')
    .isIn([
      'appointment_reminder',
      'pre_therapy_instruction',
      'post_therapy_instruction',
      'appointment_confirmation',
      'appointment_cancelled',
      'appointment_rescheduled',
      'payment_reminder',
      'therapy_completed',
      'follow_up_reminder',
      'system_announcement',
      'welcome',
      'other'
    ])
    .withMessage('Invalid notification type'),
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('message')
    .isLength({ min: 1, max: 500 })
    .withMessage('Message must be between 1 and 500 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'normal', 'high', 'urgent'])
    .withMessage('Priority must be low, normal, high, or urgent'),
  body('relatedAppointment')
    .optional()
    .isMongoId()
    .withMessage('Valid appointment ID is required'),
  body('relatedTherapy')
    .optional()
    .isMongoId()
    .withMessage('Valid therapy ID is required')
];

// Routes
// @route   GET /api/notifications
// @desc    Get notifications for authenticated user
// @access  Private
router.get('/', authenticate, getNotifications);

// @route   GET /api/notifications/stats
// @desc    Get notification statistics for authenticated user
// @access  Private
router.get('/stats', authenticate, getNotificationStats);

// @route   GET /api/notifications/:id
// @desc    Get notification by ID
// @access  Private
router.get('/:id', authenticate, getNotificationById);

// @route   POST /api/notifications
// @desc    Create new notification (admin/practitioner only)
// @access  Private (Admin/Practitioner)
router.post('/', authenticate, authorize('admin', 'practitioner'), notificationValidation, createNotification);

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put('/:id/read', authenticate, markAsRead);

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/read-all', authenticate, markAllAsRead);

// @route   DELETE /api/notifications/:id
// @desc    Delete notification
// @access  Private
router.delete('/:id', authenticate, deleteNotification);

module.exports = router;