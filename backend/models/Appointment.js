const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient is required']
  },
  practitioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Practitioner is required']
  },
  therapy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapy',
    required: [true, 'Therapy is required']
  },
  // Session details
  sessionNumber: {
    type: Number,
    required: [true, 'Session number is required'],
    min: [1, 'Session number must be positive']
  },
  totalSessions: {
    type: Number,
    required: [true, 'Total sessions is required'],
    min: [1, 'Total sessions must be positive']
  },
  // Scheduling
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Scheduled date must be in the future'
    }
  },
  scheduledTime: {
    start: {
      type: String, // Format: "HH:MM"
      required: [true, 'Start time is required'],
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)']
    },
    end: {
      type: String, // Format: "HH:MM"
      required: [true, 'End time is required'],
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)']
    }
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  // Status tracking
  status: {
    type: String,
    enum: [
      'scheduled', 
      'confirmed', 
      'in-progress', 
      'completed', 
      'cancelled', 
      'no-show',
      'rescheduled'
    ],
    default: 'scheduled'
  },
  // Payment information
  payment: {
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Payment amount cannot be negative']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'partial', 'refunded'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['cash', 'card', 'upi', 'bank_transfer', 'insurance'],
      default: 'cash'
    },
    transactionId: String,
    paidAt: Date
  },
  // Notes and observations
  notes: {
    patient: String, // Patient's notes/concerns
    practitioner: String, // Practitioner's observations
    admin: String // Administrative notes
  },
  // Pre and post therapy requirements
  requirements: {
    preTherapy: {
      completed: { type: Boolean, default: false },
      items: [String],
      notes: String
    },
    postTherapy: {
      completed: { type: Boolean, default: false },
      items: [String],
      notes: String
    }
  },
  // Feedback and rating
  feedback: {
    patientRating: {
      type: Number,
      min: 1,
      max: 5
    },
    patientReview: String,
    practitionerNotes: String,
    effectiveness: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  // Cancellation details
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    refundStatus: {
      type: String,
      enum: ['none', 'partial', 'full', 'pending']
    }
  },
  // Reminders and notifications
  reminders: [{
    type: {
      type: String,
      enum: ['pre_therapy', 'appointment', 'post_therapy', 'follow_up']
    },
    scheduledFor: Date,
    sent: { type: Boolean, default: false },
    sentAt: Date,
    method: [String] // ['email', 'sms', 'push']
  }],
  // Room/location assignment
  room: {
    type: String,
    default: 'Main Treatment Room'
  },
  // Follow-up scheduling
  nextAppointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
appointmentSchema.index({ patient: 1, scheduledDate: 1 });
appointmentSchema.index({ practitioner: 1, scheduledDate: 1 });
appointmentSchema.index({ therapy: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ scheduledDate: 1, status: 1 });

// Virtual for full datetime
appointmentSchema.virtual('fullDateTime').get(function() {
  const date = this.scheduledDate.toISOString().split('T')[0];
  return `${date}T${this.scheduledTime.start}:00`;
});

// Method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const appointmentTime = new Date(`${this.scheduledDate.toISOString().split('T')[0]}T${this.scheduledTime.start}`);
  const hoursDifference = (appointmentTime - now) / (1000 * 60 * 60);
  
  return hoursDifference >= 24 && ['scheduled', 'confirmed'].includes(this.status);
};

// Method to calculate refund amount
appointmentSchema.methods.calculateRefund = function() {
  if (!this.canBeCancelled()) return 0;
  
  const now = new Date();
  const appointmentTime = new Date(`${this.scheduledDate.toISOString().split('T')[0]}T${this.scheduledTime.start}`);
  const hoursDifference = (appointmentTime - now) / (1000 * 60 * 60);
  
  if (hoursDifference >= 48) return this.payment.amount; // Full refund
  if (hoursDifference >= 24) return this.payment.amount * 0.5; // 50% refund
  return 0; // No refund
};

// Static method to find conflicts
appointmentSchema.statics.findConflicts = function(practitionerId, date, startTime, endTime, excludeId = null) {
  const query = {
    practitioner: practitionerId,
    scheduledDate: date,
    status: { $in: ['scheduled', 'confirmed', 'in-progress'] },
    $or: [
      {
        'scheduledTime.start': { $lt: endTime },
        'scheduledTime.end': { $gt: startTime }
      }
    ]
  };
  
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  
  return this.find(query);
};

// Static method to get patient's therapy progress
appointmentSchema.statics.getPatientProgress = function(patientId, therapyId) {
  return this.find({
    patient: patientId,
    therapy: therapyId,
    status: { $in: ['completed', 'in-progress'] }
  }).sort({ sessionNumber: 1 });
};

module.exports = mongoose.model('Appointment', appointmentSchema);