import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [email,setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

try {

    const response = await fetch ('http://localhost:5001/api/newsletter',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ email }),

    });
    if (response.ok) {
      setStatus('You have successfully subscribed');
      setEmail(''); // this clears the input when successfull
    } else {
      setStatus('Something went wrong, please try again?');
    }
  } catch (err) {
     console.error(err);
     setStatus('Database error. Please try again later');
  }
};




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

          <form onSubmit={handleSubscribe}>
          <div class="input-group">
          <input type="email" class="form-control" placeholder="Your email address"
          value={email} onChange={(e) => setEmail(e.target.value)}/>
          <button className="btn btn-warning" type="submit">Subscribe</button>
          </div>
          </form>
          {status && <p className="mt-2">{status}</p>}
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