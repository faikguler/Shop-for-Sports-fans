const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4">For Sports Fans!</h1>
              <p className="lead mb-4">
                The highest quality sports equipment, jerseys, shoes and accessories. 
                From football to basketball, running to fitness, everything is here.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="btn btn-warning btn-lg px-4 py-3 fw-semibold">
                  <i className="bi bi-bag-check-fill me-2"></i>Start Shopping
                </a>
                <a href="#" className="btn btn-outline-light btn-lg px-4 py-3">
                  <i className="bi bi-play-circle-fill me-2"></i>Campaigns
                </a>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 text-center">
              <img
                src="https://placehold.co/600x400/ffc107/212529?text=Sports+Time"
                className="img-fluid rounded-4 shadow-lg"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;