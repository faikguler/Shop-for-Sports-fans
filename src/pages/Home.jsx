import { useState, useEffect } from 'react';
import { sliderService } from '../services/sliderService';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await sliderService.getAll();
        const allImages = res.data.flatMap(slider => slider.img || []);
        setImages(allImages);
      } catch (error) {
        console.error('Error fetching sliders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const carouselElement = document.querySelector('#heroCarousel');
      if (carouselElement) {
        const existingCarousel = bootstrap.Carousel.getInstance(carouselElement);
        if (existingCarousel) {
          existingCarousel.dispose();
        }
        new bootstrap.Carousel(carouselElement, {
          interval: 3000, // 3 seconds
          ride: 'carousel',
          pause: 'hover'
        });
      }
    }
  }, [images]);

  if (loading) return <div className="text-center py-5">Loading slider...</div>;

  return (
    <>
      <section className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Demo Login: ----- </strong> 
                <span className="ms-2"><strong>Admin:</strong>  admin@example.com / admin123</span>
                <span className="mx-2">|||||||||</span>
                <span><strong>User:</strong>  user@example.com / user123</span>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4">For Sports Fans!</h1>
              <p className="lead mb-4">
                The highest quality sports equipment, jerseys, shoes and accessories.
                From football to basketball, running to fitness, everything is here.
              </p>
              <div className="d-flex gap-3">
                <a href="/products" className="btn btn-warning btn-lg px-4 py-3 fw-semibold">
                  <i className="bi bi-bag-check-fill me-2"></i>Start Shopping
                </a>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              {images.length > 0 ? (
                <div id="heroCarousel" className="carousel slide" style={{ height: '400px' }}>
                  <div className="carousel-inner h-100">
                    {images.map((img, idx) => (
                      <div key={idx} className={`carousel-item h-100 ${idx === 0 ? 'active' : ''}`}>
                        <img
                          src={img}
                          className="d-block w-100 h-100"
                          alt={`Slide ${idx + 1}`}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="carousel-indicators" style={{ bottom: '10px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '20px', width: 'auto', left: '50%', transform: 'translateX(-50%)', marginLeft: 0 }}>
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        data-bs-target="#heroCarousel"
                        data-bs-slide-to={idx}
                        className={idx === 0 ? 'active' : ''}
                        aria-current={idx === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${idx + 1}`}
                        style={{ backgroundColor: '#fff', opacity: 0.7 }}
                      />
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide="prev"
                    style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide="next"
                    style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              ) : (
                <img
                  src="https://placehold.co/600x400/ffc107/212529?text=Sports+Time"
                  className="img-fluid rounded-4 shadow-lg"
                  alt="Hero"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;