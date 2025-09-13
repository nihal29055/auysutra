const Therapy = require('../models/Therapy');
const { validationResult } = require('express-validator');

// Get all therapies
const getTherapies = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, type, search, minPrice, maxPrice } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sanskritName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (minPrice || maxPrice) {
      query['price.perSession'] = {};
      if (minPrice) query['price.perSession'].$gte = parseFloat(minPrice);
      if (maxPrice) query['price.perSession'].$lte = parseFloat(maxPrice);
    }

    const therapies = await Therapy.find(query)
      .populate('createdBy', 'name role')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Therapy.countDocuments(query);

    res.json({
      success: true,
      data: {
        therapies,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get therapies error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch therapies',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get therapy by ID
const getTherapyById = async (req, res) => {
  try {
    const therapy = await Therapy.findById(req.params.id)
      .populate('createdBy', 'name role professionalInfo');

    if (!therapy) {
      return res.status(404).json({
        success: false,
        message: 'Therapy not found'
      });
    }

    if (!therapy.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Therapy is not available'
      });
    }

    res.json({
      success: true,
      data: { therapy }
    });

  } catch (error) {
    console.error('Get therapy error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid therapy ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch therapy',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create new therapy (practitioners/admin only)
const createTherapy = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const therapyData = {
      ...req.body,
      createdBy: req.user._id
    };

    const therapy = new Therapy(therapyData);
    await therapy.save();

    const populatedTherapy = await Therapy.findById(therapy._id)
      .populate('createdBy', 'name role');

    res.status(201).json({
      success: true,
      message: 'Therapy created successfully',
      data: { therapy: populatedTherapy }
    });

  } catch (error) {
    console.error('Create therapy error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Therapy with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create therapy',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update therapy
const updateTherapy = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const therapy = await Therapy.findById(req.params.id);
    
    if (!therapy) {
      return res.status(404).json({
        success: false,
        message: 'Therapy not found'
      });
    }

    // Check if user owns the therapy or is admin
    if (therapy.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this therapy'
      });
    }

    const updatedTherapy = await Therapy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name role');

    res.json({
      success: true,
      message: 'Therapy updated successfully',
      data: { therapy: updatedTherapy }
    });

  } catch (error) {
    console.error('Update therapy error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid therapy ID'
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Therapy with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update therapy',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete therapy (soft delete)
const deleteTherapy = async (req, res) => {
  try {
    const therapy = await Therapy.findById(req.params.id);
    
    if (!therapy) {
      return res.status(404).json({
        success: false,
        message: 'Therapy not found'
      });
    }

    // Check if user owns the therapy or is admin
    if (therapy.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this therapy'
      });
    }

    // Soft delete - just mark as inactive
    therapy.isActive = false;
    await therapy.save();

    res.json({
      success: true,
      message: 'Therapy deleted successfully'
    });

  } catch (error) {
    console.error('Delete therapy error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid therapy ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete therapy',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get therapy categories
const getCategories = async (req, res) => {
  try {
    const categories = await Therapy.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get therapy types
const getTypes = async (req, res) => {
  try {
    const types = await Therapy.distinct('type', { isActive: true });
    
    res.json({
      success: true,
      data: { types }
    });

  } catch (error) {
    console.error('Get types error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch types',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Search therapies
const searchTherapies = async (req, res) => {
  try {
    const { q: query, limit = 10 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const therapies = await Therapy.search(query)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: { therapies }
    });

  } catch (error) {
    console.error('Search therapies error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search therapies',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get recommended therapies for a condition
const getRecommendedTherapies = async (req, res) => {
  try {
    const { condition } = req.query;
    
    if (!condition) {
      return res.status(400).json({
        success: false,
        message: 'Medical condition is required'
      });
    }

    const therapies = await Therapy.find({
      isActive: true,
      indications: { $regex: condition, $options: 'i' }
    })
    .populate('createdBy', 'name role')
    .limit(10)
    .sort({ 'stats.averageRating': -1 });

    res.json({
      success: true,
      data: { therapies }
    });

  } catch (error) {
    console.error('Get recommended therapies error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommended therapies',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getTherapies,
  getTherapyById,
  createTherapy,
  updateTherapy,
  deleteTherapy,
  getCategories,
  getTypes,
  searchTherapies,
  getRecommendedTherapies
};