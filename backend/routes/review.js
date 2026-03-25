const router = require('express').Router();
const {
  createReview,
  getReviewsByProduct,
  getAllReviews,
  deleteReview,
} = require('../controllers/reviewController');
const { authMiddleware, adminMiddleware } = require('../utils/auth');

// Public: get reviews for a product
router.get('/product/:productId', getReviewsByProduct);

// Authenticated: create review
router.post('/', authMiddleware, createReview);

// Admin: get all reviews, delete review
router.get('/', authMiddleware, adminMiddleware, getAllReviews);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReview);

module.exports = router;