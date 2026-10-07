const FAQ = require('../models/FAQ');

// @desc    Create new FAQ
// @route   POST /api/faqs
const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category } = req.body;

    const faq = await FAQ.create({
      question,
      answer,
      category: category || 'General',
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all FAQs
// @route   GET /api/faqs
const getAllFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find().populate('createdBy', 'name email');
    res.status(200).json({
      success: true,
      message: 'FAQs retrieved successfully',
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single FAQ by ID
// @route   GET /api/faqs/:id
const getFAQById = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id).populate('createdBy', 'name email');
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }
    res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search FAQs by keyword
// @route   GET /api/faqs/search?q=query
const searchFAQs = async (req, res, next) => {
  try {
    const keyword = req.query.q
      ? {
          $or: [
            { question: { $regex: req.query.q, $options: 'i' } },
            { answer: { $regex: req.query.q, $options: 'i' } },
            { category: { $regex: req.query.q, $options: 'i' } },
          ],
        }
      : {};

    const faqs = await FAQ.find(keyword).populate('createdBy', 'name email');
    res.status(200).json({
      success: true,
      message: 'Search completed successfully',
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
const updateFAQ = async (req, res, next) => {
  try {
    let faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    if (faq.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this FAQ',
      });
    }

    faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    if (faq.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this FAQ',
      });
    }

    await faq.deleteOne();

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  searchFAQs,
  updateFAQ,
  deleteFAQ,
};