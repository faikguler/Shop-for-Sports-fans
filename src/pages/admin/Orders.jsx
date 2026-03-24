import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-warning text-dark',
      shipped: 'bg-info',
      delivered: 'bg-success',
      cancelled: 'bg-danger',
    };
    return <span className={`badge ${colors[status] || 'bg-secondary'}`}>{status}</span>;
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Order Management</h2>
      <div className="card">
        <div className="card-header">All Orders</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                  <th>Shipping Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user?.name || `User #${order.userId}`}</td>
                    <td>£{order.totalAmount}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{order.paymentMethod || 'N/A'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.shippingAddress}</td>
                    <td>
                      <Link to={`/order/${order.id}`} className="btn btn-sm btn-info me-2">
                        View
                      </Link>
                      <select
                        className="form-select form-select-sm d-inline-block"
                        style={{ width: 'auto' }}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={updating === order.id}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;