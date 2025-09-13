const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipient is required']
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    required: [true, 'Notification type is required'],
    enum: [
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
    ]
  },
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  // Related entities
  relatedAppointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  relatedTherapy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapy'
  },
  // Delivery channels
  channels: {
    email: {
      enabled: { type: Boolean, default: true },
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    sms: {
      enabled: { type: Boolean, default: false },
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    push: {
      enabled: { type: Boolean, default: true },
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    inApp: {
      enabled: { type: Boolean, default: true },
      read: { type: Boolean, default: false },
      readAt: Date
    }
  },
  // Scheduling
  scheduledFor: {
    type: Date,
    default: Date.now
  },
  sent: {
    type: Boolean,
    default: false
  },
  sentAt: Date,
  // Priority and urgency
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'cancelled'],
    default: 'pending'
  },
  // Retry mechanism
  attempts: {
    type: Number,
    default: 0,
    max: 3
  },
  lastAttemptAt: Date,
  // Action buttons (for interactive notifications)
  actions: [{
    label: String,
    action: String, // 'confirm', 'reschedule', 'cancel', 'view', etc.
    url: String,
    primary: { type: Boolean, default: false }
  }],
  // Personalization
  variables: {
    type: Map,
    of: String // Key-value pairs for template variables
  },
  // Template information
  template: {
    id: String,
    version: String
  },
  // Delivery metadata
  deliveryInfo: {
    emailId: String,
    smsId: String,
    pushId: String,
    bounced: { type: Boolean, default: false },
    clicked: { type: Boolean, default: false },
    opened: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ status: 1 });
notificationSchema.index({ scheduledFor: 1 });
notificationSchema.index({ sent: 1, scheduledFor: 1 });
notificationSchema.index({ 'channels.inApp.read': 1, recipient: 1 });

// Virtual for checking if notification is overdue
notificationSchema.virtual('isOverdue').get(function() {
  return this.scheduledFor < new Date() && !this.sent;
});

// Method to mark as sent
notificationSchema.methods.markAsSent = function(channel = null) {
  this.sent = true;
  this.sentAt = new Date();
  this.status = 'sent';
  
  if (channel && this.channels[channel]) {
    this.channels[channel].sent = true;
    this.channels[channel].sentAt = new Date();
  }
  
  return this.save();
};

// Method to mark as failed
notificationSchema.methods.markAsFailed = function(error, channel = null) {
  this.status = 'failed';
  this.attempts += 1;
  this.lastAttemptAt = new Date();
  
  if (channel && this.channels[channel]) {
    this.channels[channel].error = error;
  }
  
  return this.save();
};

// Method to mark in-app notification as read
notificationSchema.methods.markAsRead = function() {
  this.channels.inApp.read = true;
  this.channels.inApp.readAt = new Date();
  return this.save();
};

// Method to check if can retry
notificationSchema.methods.canRetry = function() {
  return this.attempts < 3 && this.status === 'failed';
};

// Static method to get unread notifications for a user
notificationSchema.statics.getUnreadForUser = function(userId, limit = 50) {
  return this.find({
    recipient: userId,
    'channels.inApp.read': false,
    'channels.inApp.enabled': true
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .populate('sender', 'name role')
  .populate('relatedAppointment', 'scheduledDate scheduledTime')
  .populate('relatedTherapy', 'name');
};

// Static method to get pending notifications for delivery
notificationSchema.statics.getPendingForDelivery = function(limit = 100) {
  return this.find({
    status: 'pending',
    scheduledFor: { $lte: new Date() },
    attempts: { $lt: 3 }
  })
  .sort({ priority: -1, scheduledFor: 1 })
  .limit(limit)
  .populate('recipient', 'email phone preferences');
};

// Static method to create appointment reminder
notificationSchema.statics.createAppointmentReminder = function(appointmentId, reminderType = 'appointment_reminder') {
  // This will be populated by the controller when creating the notification
  return {
    type: reminderType,
    relatedAppointment: appointmentId,
    priority: 'high'
  };
};

// Static method to clean old notifications
notificationSchema.statics.cleanOldNotifications = function(daysOld = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  return this.deleteMany({
    createdAt: { $lt: cutoffDate },
    'channels.inApp.read': true,
    status: 'sent'
  });
};

module.exports = mongoose.model('Notification', notificationSchema);