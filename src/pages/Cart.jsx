import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-warning mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.images?.[0] || 'https://placehold.co/50x50'}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>£{item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    style={{ width: '70px' }}
                    className="form-control"
                  />
                </td>
                <td>£{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end fw-bold">Total:</td>
              <td className="fw-bold text-warning">£{cartTotal.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/products" className="btn btn-outline-secondary">Continue Shopping</Link>
        <button className="btn btn-success">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;