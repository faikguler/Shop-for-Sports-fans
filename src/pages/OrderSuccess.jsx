import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    orderService.getById(id)
      .then(res => setOrder(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load order'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-5 text-center">
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <i className="bi bi-check-circle-fill text-success display-1"></i>
          <h2 className="mt-3">Order Placed Successfully!</h2>
          <p className="lead">Thank you for your purchase.</p>
          <p>Order ID: #{order.id}</p>
          <p>Total: £{order.totalAmount}</p>
          <p>Status: <span className="badge bg-warning">{order.status}</span></p>
          <Link to="/my-orders" className="btn btn-primary mt-3">
            View My Orders
          </Link>
          <Link to="/" className="btn btn-outline-secondary mt-3 ms-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;