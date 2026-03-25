const { Review, Product, User } = require('../models');

exports.createReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const userId = req.user.id;

    const existing = await Review.findOne({ where: { userId, productId } });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({ rating, comment, userId, productId });

    const product = await Product.findByPk(productId);
    const reviews = await Review.findAll({ where: { productId } });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await product.update({ averageRating: avg });

    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: [{ model: User, attributes: ['name'] }], // include user name
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews by product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    await review.destroy();

    const product = await Product.findByPk(review.productId);
    const remainingReviews = await Review.findAll({ where: { productId: review.productId } });
    const newAvg = remainingReviews.length ? remainingReviews.reduce((s, r) => s + r.rating, 0) / remainingReviews.length : null;
    await product.update({ averageRating: newAvg });

    res.status(204).send();
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};