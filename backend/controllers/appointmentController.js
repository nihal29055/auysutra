const Appointment = require('../models/Appointment');
const Therapy = require('../models/Therapy');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      practitioner,
      therapy,
      scheduledDate,
      scheduledTime,
      sessionNumber = 1,
      totalSessions,
      notes
    } = req.body;

    // Verify therapy exists
    const therapyDoc = await Therapy.findById(therapy);
    if (!therapyDoc || !therapyDoc.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Therapy not found or not available'
      });
    }

    // Verify practitioner exists and is active
    const practitionerDoc = await User.findById(practitioner);
    if (!practitionerDoc || practitionerDoc.role !== 'practitioner' || !practitionerDoc.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Practitioner not found or not available'
      });
    }

    // Check for scheduling conflicts
    const conflicts = await Appointment.findConflicts(
      practitioner,
      new Date(scheduledDate),
      scheduledTime.start,
      scheduledTime.end
    );

    if (conflicts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Time slot is not available. Please choose a different time.',
        conflicts: conflicts.map(c => ({
          id: c._id,
          time: `${c.scheduledTime.start} - ${c.scheduledTime.end}`,
          therapy: c.therapy
        }))
      });
    }

    // Calculate duration
    const startTime = new Date(`1970-01-01T${scheduledTime.start}:00`);
    const endTime = new Date(`1970-01-01T${scheduledTime.end}:00`);
    const duration = (endTime - startTime) / (1000 * 60); // in minutes

    const appointmentData = {
      patient: req.user._id,
      practitioner,
      therapy,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      duration,
      sessionNumber,
      totalSessions: totalSessions || therapyDoc.duration.course,
      payment: {
        amount: therapyDoc.price.perSession
      },
      notes: {
        patient: notes?.patient || ''
      }
    };

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name email phone')
      .populate('practitioner', 'name email phone professionalInfo')
      .populate('therapy', 'name duration price');

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      data: { appointment: populatedAppointment }
    });

  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get appointments
const getAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date, practitioner } = req.query;
    
    // Build query based on user role
    let query = {};
    
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'practitioner') {
      query.practitioner = req.user._id;
    }
    
    // Apply filters
    if (status) {
      query.status = status;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.scheduledDate = { $gte: startDate, $lte: endDate };
    }
    
    if (practitioner && req.user.role === 'admin') {
      query.practitioner = practitioner;
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone')
      .populate('practitioner', 'name email phone professionalInfo')
      .populate('therapy', 'name sanskritName duration price')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ scheduledDate: 1, 'scheduledTime.start': 1 });

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name email phone age gender address medicalHistory')
      .populate('practitioner', 'name email phone professionalInfo')
      .populate('therapy', 'name sanskritName description duration price preparation');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    const isAuthorized = 
      req.user.role === 'admin' ||
      appointment.patient._id.toString() === req.user._id.toString() ||
      appointment.practitioner._id.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this appointment'
      });
    }

    res.json({
      success: true,
      data: { appointment }
    });

  } catch (error) {
    console.error('Get appointment error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    const isAuthorized = 
      req.user.role === 'admin' ||
      appointment.patient.toString() === req.user._id.toString() ||
      appointment.practitioner.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    // Check if appointment can be updated
    if (['completed', 'cancelled'].includes(appointment.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update completed or cancelled appointments'
      });
    }

    // If rescheduling, check for conflicts
    if (req.body.scheduledDate || req.body.scheduledTime) {
      const newDate = req.body.scheduledDate ? new Date(req.body.scheduledDate) : appointment.scheduledDate;
      const newTime = req.body.scheduledTime || appointment.scheduledTime;
      
      const conflicts = await Appointment.findConflicts(
        appointment.practitioner,
        newDate,
        newTime.start,
        newTime.end,
        appointment._id
      );

      if (conflicts.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Time slot is not available. Please choose a different time.',
          conflicts: conflicts.map(c => ({
            id: c._id,
            time: `${c.scheduledTime.start} - ${c.scheduledTime.end}`
          }))
        });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('patient', 'name email phone')
    .populate('practitioner', 'name email phone')
    .populate('therapy', 'name duration price');

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: { appointment: updatedAppointment }
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    const isAuthorized = 
      req.user.role === 'admin' ||
      appointment.patient.toString() === req.user._id.toString() ||
      appointment.practitioner.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment'
      });
    }

    // Check if appointment can be cancelled
    if (!appointment.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Appointment cannot be cancelled. Cancellation must be done at least 24 hours in advance.'
      });
    }

    // Calculate refund
    const refundAmount = appointment.calculateRefund();

    appointment.status = 'cancelled';
    appointment.cancellation = {
      cancelledAt: new Date(),
      cancelledBy: req.user._id,
      reason: reason || 'No reason provided',
      refundStatus: refundAmount > 0 ? 'pending' : 'none'
    };

    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: { 
        appointment,
        refundAmount
      }
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get available time slots for a practitioner
const getAvailableSlots = async (req, res) => {
  try {
    const { practitionerId, date } = req.query;
    
    if (!practitionerId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Practitioner ID and date are required'
      });
    }

    // Get existing appointments for the date
    const existingAppointments = await Appointment.find({
      practitioner: practitionerId,
      scheduledDate: new Date(date),
      status: { $in: ['scheduled', 'confirmed', 'in-progress'] }
    }).select('scheduledTime duration');

    // Generate available slots (simple implementation)
    const workingHours = {
      start: '09:00',
      end: '17:00'
    };
    
    const slotDuration = 60; // 60 minutes slots
    const availableSlots = [];
    
    let currentTime = workingHours.start;
    while (currentTime < workingHours.end) {
      const [hours, minutes] = currentTime.split(':').map(Number);
      const slotStart = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      // Calculate end time
      const endMinutes = minutes + slotDuration;
      const endHours = hours + Math.floor(endMinutes / 60);
      const finalMinutes = endMinutes % 60;
      const slotEnd = `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
      
      // Check if slot conflicts with existing appointments
      const hasConflict = existingAppointments.some(apt => {
        return (slotStart < apt.scheduledTime.end && slotEnd > apt.scheduledTime.start);
      });
      
      if (!hasConflict && slotEnd <= workingHours.end) {
        availableSlots.push({
          start: slotStart,
          end: slotEnd,
          available: true
        });
      }
      
      // Move to next slot
      currentTime = slotEnd;
    }

    res.json({
      success: true,
      data: { availableSlots }
    });

  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available slots',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getAvailableSlots
};