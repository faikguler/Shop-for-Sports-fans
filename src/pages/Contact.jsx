import { useState } from 'react';
import API from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await API.post('/contact', formData);
      setStatus({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'danger', text: 'Failed to send message. Please try again.' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info & Map */}
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Get in touch</h2>
              <div className="d-flex align-items-start mb-4">
                <i className="bi bi-geo-alt-fill text-warning fs-3 me-3"></i>
                <div>
                  <h5>Visit us</h5>
                  <p className="mb-0">Office 4, Unit 6, First Floor, Stanhope Gate<br />Camberley GU15 3DW</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-4">
                <i className="bi bi-telephone-fill text-warning fs-3 me-3"></i>
                <div>
                  <h5>Call us</h5>
                  <p className="mb-0">+44 20 4502 0325<br />Mon-Sun, 5am-11pm</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-4">
                <i className="bi bi-envelope-fill text-warning fs-3 me-3"></i>
                <div>
                  <h5>Email</h5>
                  <p className="mb-0">support@sportshop.com</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Send us a message</h2>
              {status && (
                <div className={`alert alert-${status.type}`} role="alert">
                  {status.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-warning btn-lg px-5" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'} <i className="bi bi-send ms-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;