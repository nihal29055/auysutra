const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');

// Get notifications for authenticated user
const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    let query = { recipient: req.user._id };
    
    if (unreadOnly === 'true') {
      query['channels.inApp.read'] = false;
      query['channels.inApp.enabled'] = true;
    }

    const notifications = await Notification.find(query)
      .populate('sender', 'name role')
      .populate('relatedAppointment', 'scheduledDate scheduledTime therapy')
      .populate({
        path: 'relatedAppointment',
        populate: {
          path: 'therapy',
          select: 'name sanskritName'
        }
      })
      .populate('relatedTherapy', 'name sanskritName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      'channels.inApp.read': false,
      'channels.inApp.enabled': true
    });

    res.json({
      success: true,
      data: {
        notifications,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        },
        unreadCount
      }
    });

  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get notification by ID
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate('sender', 'name role')
      .populate('relatedAppointment', 'scheduledDate scheduledTime therapy patient practitioner')
      .populate({
        path: 'relatedAppointment',
        populate: [
          { path: 'therapy', select: 'name sanskritName' },
          { path: 'patient', select: 'name' },
          { path: 'practitioner', select: 'name' }
        ]
      })
      .populate('relatedTherapy', 'name sanskritName description');

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Check if user is authorized to view this notification
    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this notification'
      });
    }

    res.json({
      success: true,
      data: { notification }
    });

  } catch (error) {
    console.error('Get notification error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid notification ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create notification (internal use or admin)
const createNotification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const notificationData = {
      ...req.body,
      sender: req.user._id
    };

    const notification = new Notification(notificationData);
    await notification.save();

    const populatedNotification = await Notification.findById(notification._id)
      .populate('recipient', 'name email preferences')
      .populate('sender', 'name role')
      .populate('relatedAppointment', 'scheduledDate scheduledTime')
      .populate('relatedTherapy', 'name');

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: { notification: populatedNotification }
    });

  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Check if user is authorized
    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this notification'
      });
    }

    if (notification.channels.inApp.read) {
      return res.json({
        success: true,
        message: 'Notification is already marked as read'
      });
    }

    await notification.markAsRead();

    res.json({
      success: true,
      message: 'Notification marked as read'
    });

  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { 
        recipient: req.user._id,
        'channels.inApp.read': false,
        'channels.inApp.enabled': true
      },
      { 
        'channels.inApp.read': true,
        'channels.inApp.readAt': new Date()
      }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });

  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Check if user is authorized
    const isAuthorized = 
      notification.recipient.toString() === req.user._id.toString() ||
      req.user.role === 'admin';

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this notification'
      });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });

  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create appointment reminder (helper function)
const createAppointmentReminder = async (appointmentId, reminderType = 'appointment_reminder', scheduledFor = new Date()) => {
  try {
    // This function would be called internally when appointments are created
    const Appointment = require('../models/Appointment');
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'name preferences')
      .populate('therapy', 'name preparation')
      .populate('practitioner', 'name');

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    let title, message;

    switch (reminderType) {
      case 'appointment_reminder':
        title = 'Appointment Reminder';
        message = `Your ${appointment.therapy.name} appointment is scheduled for ${appointment.scheduledDate.toDateString()} at ${appointment.scheduledTime.start}`;
        break;
      case 'pre_therapy_instruction':
        title = 'Pre-Therapy Instructions';
        message = `Please follow the pre-therapy instructions for your upcoming ${appointment.therapy.name} session`;
        break;
      case 'post_therapy_instruction':
        title = 'Post-Therapy Care';
        message = `Please follow the post-therapy care instructions for optimal results`;
        break;
      default:
        title = 'Appointment Notification';
        message = `You have an upcoming appointment for ${appointment.therapy.name}`;
    }

    const notification = new Notification({
      recipient: appointment.patient._id,
      type: reminderType,
      title,
      message,
      relatedAppointment: appointmentId,
      relatedTherapy: appointment.therapy._id,
      scheduledFor,
      priority: 'high',
      channels: {
        email: { enabled: appointment.patient.preferences?.notifications?.email || true },
        sms: { enabled: appointment.patient.preferences?.notifications?.sms || false },
        push: { enabled: appointment.patient.preferences?.notifications?.push || true },
        inApp: { enabled: true }
      }
    });

    await notification.save();
    return notification;

  } catch (error) {
    console.error('Create appointment reminder error:', error);
    throw error;
  }
};

// Get notification statistics
const getNotificationStats = async (req, res) => {
  try {
    const stats = await Notification.aggregate([
      { $match: { recipient: req.user._id } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          unread: {
            $sum: {
              $cond: [{ $eq: ['$channels.inApp.read', false] }, 1, 0]
            }
          }
        }
      }
    ]);

    const totalNotifications = await Notification.countDocuments({ recipient: req.user._id });
    const totalUnread = await Notification.countDocuments({
      recipient: req.user._id,
      'channels.inApp.read': false,
      'channels.inApp.enabled': true
    });

    res.json({
      success: true,
      data: {
        total: totalNotifications,
        unread: totalUnread,
        byType: stats
      }
    });

  } catch (error) {
    console.error('Get notification stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createAppointmentReminder,
  getNotificationStats
};