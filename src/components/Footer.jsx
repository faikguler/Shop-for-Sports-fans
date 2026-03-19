import { Link } from 'react-router-dom';

const Footer = () => {
  return (
  <footer class="bg-dark text-white pt-5 pb-4">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <h5 class="fw-bold mb-3"><i class="bi bi-trophy-fill text-warning me-2"></i>SportShop</h5>
          <p>The meeting point for sports fans. Highest quality products, best prices.</p>
          <div class="d-flex gap-3">
            <a href="#" class="text-white fs-4"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-white fs-4"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-white fs-4"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="text-white fs-4"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
        <div class="col-md-2">
          <h6 class="fw-bold mb-3">Company</h6>
          <ul class="list-unstyled">
            <Link className="nav-link" to="/about">About Us</Link>
            <Link className="nav-link" to="/contact">Contact Us</Link>
            <Link className="nav-link" to="/">Home</Link>
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">Stores</a></li>
          </ul>
        </div>
        <div class="col-md-2">
          <h6 class="fw-bold mb-3">Help</h6>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">FAQs</a></li>
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">Shipping & Delivery</a></li>
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">Returns</a></li>
            <li class="mb-2"><a href="#" class="text-white text-decoration-none">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="fw-bold mb-3">Newsletter</h6>
          <p>Be the first to know about campaigns.</p>
          <div class="input-group">
            <input type="email" class="form-control" placeholder="Your email address"/>
            <button class="btn btn-warning" type="button">Subscribe</button>
          </div>
        </div>
      </div>
      <hr class="border-secondary my-4"/>
      <div class="row">
        <div class="col text-center">
          <p class="mb-0">&copy; 2026 SportShop – All rights reserved. Crafted by Coders of the Apocalypse.</p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;