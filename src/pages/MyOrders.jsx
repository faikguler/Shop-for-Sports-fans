import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    orderService.getUserOrders()
      .then(res => setOrders(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center my-5">Loading orders...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  if (orders.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>No Orders Yet</h2>
        <Link to="/products" className="btn btn-warning mt-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>£{order.totalAmount}</td>
                <td>
                  <span className={`badge ${
                    order.status === 'delivered' ? 'bg-success' :
                    order.status === 'cancelled' ? 'bg-danger' :
                    'bg-warning'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link to={`/order/${order.id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;