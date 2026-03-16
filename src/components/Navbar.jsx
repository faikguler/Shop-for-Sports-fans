import { Link } from 'react-router-dom';

const Navbar = () => {
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
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search products..." />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <Link to="/cart" className="btn btn-outline-light ms-2">
            <i className="bi bi-cart3"></i> <span className="badge bg-warning text-dark">0</span>
          </Link>
          <Link to="/login" className="btn btn-warning ms-2">
            <i className="bi bi-person-circle"></i> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;