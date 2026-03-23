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
  <footer className="bg-dark text-white pt-5 pb-4">
    <div className="container">
      <div className="row g-4">
        <div className="col-md-4">
          <h5 className="fw-bold mb-3"><i className="bi bi-trophy-fill text-warning me-2"></i>SportShop</h5>
          <p>The meeting point for sports fans. Highest quality products, best prices.</p>
          <div className="d-flex gap-3">
            <a href="#" className="text-white fs-4"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-white fs-4"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-white fs-4"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="text-white fs-4"><i className="bi bi-youtube"></i></a>
          </div>
        </div>
        <div className="col-md-2">
          <h6 className="fw-bold mb-3">Company</h6>
          <ul className="list-unstyled">
            <Link className="nav-link" to="/about">About Us</Link>
            <Link className="nav-link" to="/contact">Contact Us</Link>
            <Link className="nav-link" to="/">Home</Link>
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Stores</a></li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="fw-bold mb-3">Help</h6>
          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">FAQs</a></li>
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Shipping & Delivery</a></li>
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Returns</a></li>
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h6 className="fw-bold mb-3">Newsletter</h6>
          <p>Be the first to know about campaigns.</p>

          <form onSubmit={handleSubscribe}>
          <div className="input-group">
          <input type="email" className="form-control" placeholder="Your email address"
          value={email} onChange={(e) => setEmail(e.target.value)}/>
          <button className="btn btn-warning" type="submit">Subscribe</button>
          </div>
          </form>
          {status && <p className="mt-2">{status}</p>}
        </div>
      </div>
      <hr className="border-secondary my-4"/>
      <div className="row">
        <div className="col text-center">
          <p className="mb-0">&copy; 2026 SportShop – All rights reserved. Crafted by Coders of the Apocalypse.</p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;