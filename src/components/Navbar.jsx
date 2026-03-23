import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };    

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <i className="bi bi-trophy-fill text-warning me-2"></i>SportShop
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/contact">Contact</NavLink>
            </li>
          </ul>

          {user ? (
            <>
              <span className="text-white me-2">Hi, {user.name}</span>
              <Link to="/profile" className="btn btn-secondary ms-2">
                <i className="bi bi-person-circle"></i> Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="btn btn-secondary ms-2">
                  <i className="bi bi-shield-lock-fill"></i> Admin Panel
                </Link>
              )}
              <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
            <Link to="/register" className="btn btn-warning ms-2"><i className="bi bi-person-circle"></i> Register</Link>
            <Link to="/login" className="btn btn-warning ms-2">
              <i className="bi bi-person-circle"></i> Login
            </Link>
            </>
          )}
          <Link to="/cart" className="btn btn-outline-light ms-2 position-relative">
            <i className="bi bi-cart3"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;