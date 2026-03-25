import { useState, useEffect } from 'react';
import { reviewService } from '../services/reviewService';

const ReviewSection = ({ productId, user }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await reviewService.getByProduct(productId);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await reviewService.create({ productId, rating: newReview.rating, comment: newReview.comment });
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(); // reload reviews
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="mt-5">
      <h4>Customer Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6 className="card-subtitle mb-2 text-muted">{review.user?.name || 'Anonymous'}</h6>
                <span>{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="card-text">{review.comment}</p>
              <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))
      )}

      {user ? (
        <div className="card mt-4">
          <div className="card-body">
            <h5>Write a Review</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                >
                  {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Your Review</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className="mt-3">Please <a href="/login">log in</a> to leave a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;