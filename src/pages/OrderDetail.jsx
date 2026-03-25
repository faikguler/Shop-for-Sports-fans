import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

const OrderDetail = () => {
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
  if (!order) return <div className="alert alert-warning">Order not found</div>;

  // Use the actual key from the response: order_items
  const orderItems = order.order_items || [];

  return (
    <div className="container py-5">
      <h2 className="mb-4">Order Details</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="mb-0">Order Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Order ID:</strong> #{order.id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> <span className={`badge ${
                order.status === 'delivered' ? 'bg-success' :
                order.status === 'cancelled' ? 'bg-danger' :
                'bg-warning'
              }`}>{order.status}</span></p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Items</h5>
            </div>
            <div className="card-body">
              {orderItems.length === 0 ? (
                <p>No items found for this order.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map(item => {
                        const product = item.product;
                        return (
                          <tr key={item.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                {product?.images?.[0] && (
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                  />
                                )}
                                <Link to={`/product/${item.productId}`}>
                                  {product?.name || `Product #${item.productId}`}
                                </Link>
                              </div>
                            </td>
                            <td>{item.quantity}</td>
                            <td>£{item.price}</td>
                            <td>£{(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="fw-bold">
                        <td colSpan="3" className="text-end">Total:</td>
                        <td>£{order.totalAmount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/orders" className="btn btn-outline-secondary">
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetail;