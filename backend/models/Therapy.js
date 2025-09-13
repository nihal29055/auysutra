const mongoose = require('mongoose');

const therapySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Therapy name is required'],
    trim: true,
    unique: true
  },
  sanskritName: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Therapy category is required'],
    enum: [
      'Shodhana', // Purification therapies
      'Shamana', // Palliative therapies
      'Rasayana', // Rejuvenation therapies
      'Satwavajaya', // Psychotherapy
      'Other'
    ]
  },
  type: {
    type: String,
    required: [true, 'Therapy type is required'],
    enum: [
      'Vamana', // Therapeutic vomiting
      'Virechana', // Purgation
      'Basti', // Medicated enema
      'Nasya', // Nasal administration
      'Raktamokshana', // Bloodletting
      'Abhyanga', // Oil massage
      'Swedana', // Fomentation
      'Shirodhara', // Oil pouring
      'Akshi Tarpana', // Eye treatment
      'Karna Purana', // Ear treatment
      'Other'
    ]
  },
  description: {
    type: String,
    required: [true, 'Therapy description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  benefits: [String],
  indications: [String], // Medical conditions it treats
  contraindications: [String], // When not to use
  duration: {
    session: {
      type: Number, // Duration in minutes
      required: [true, 'Session duration is required'],
      min: [15, 'Session must be at least 15 minutes'],
      max: [480, 'Session cannot exceed 8 hours']
    },
    course: {
      type: Number, // Number of sessions in a complete course
      required: [true, 'Course duration is required'],
      min: [1, 'Course must have at least 1 session'],
      max: [100, 'Course cannot exceed 100 sessions']
    }
  },
  preparation: {
    preTherapy: [String], // Things to do before therapy
    postTherapy: [String], // Things to do after therapy
    diet: [String], // Dietary recommendations
    lifestyle: [String] // Lifestyle recommendations
  },
  materials: [String], // Required materials/medicines
  price: {
    perSession: {
      type: Number,
      required: [true, 'Price per session is required'],
      min: [0, 'Price cannot be negative']
    },
    fullCourse: Number
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Scheduling preferences
  scheduling: {
    preferredTimeSlots: [String], // e.g., ['morning', 'afternoon']
    daysBetweenSessions: {
      type: Number,
      default: 1,
      min: 0
    },
    seasonalRestrictions: [String] // e.g., ['monsoon']
  },
  // Statistics
  stats: {
    totalBookings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
therapySchema.index({ category: 1, type: 1 });
therapySchema.index({ name: 'text', description: 'text' });
therapySchema.index({ isActive: 1 });
therapySchema.index({ 'price.perSession': 1 });

// Virtual for full course price calculation
therapySchema.virtual('fullCoursePrice').get(function() {
  if (this.price.fullCourse) {
    return this.price.fullCourse;
  }
  return this.price.perSession * this.duration.course;
});

// Method to check if therapy is suitable for a condition
therapySchema.methods.isSuitableFor = function(condition) {
  return this.indications.some(indication => 
    indication.toLowerCase().includes(condition.toLowerCase())
  );
};

// Method to check contraindications
therapySchema.methods.hasContraindication = function(condition) {
  return this.contraindications.some(contraindication => 
    contraindication.toLowerCase().includes(condition.toLowerCase())
  );
};

// Static method to find therapies by category
therapySchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true });
};

// Static method for search
therapySchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    isActive: true
  }).select('name sanskritName category type description price duration');
};

module.exports = mongoose.model('Therapy', therapySchema);