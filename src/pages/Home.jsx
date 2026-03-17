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

      {/* Categories Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold border-bottom border-warning border-3 pb-2 d-inline-block mx-auto">
            Categories
          </h2>
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="card border-0 bg-white shadow-sm p-3">
                <h5 className="mt-3">Cycling</h5>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card border-0 bg-white shadow-sm p-3">
                <h5 className="mt-3">Basketball</h5>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card border-0 bg-white shadow-sm p-3">
                <h5 className="mt-3">Football</h5>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card border-0 bg-white shadow-sm p-3">
                <h5 className="mt-3">Fitness</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold border-bottom border-warning border-3 pb-2 d-inline-block mx-auto">
            Featured Products
          </h2>
          <div className="row g-4">
            {/* Product Card 1 */}
            <div className="col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="https://placehold.co/300x300/212529/ffc107?text=Jersey"
                  className="card-img-top p-3"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Fenerbahçe 2024/25 Home Jersey</h5>
                  <p className="card-text text-warning fw-bold">£89.99</p>
                </div>
                <div className="card-footer bg-white border-0 pb-3">
                  <button className="btn btn-warning w-100">
                    Add to Cart <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="https://placehold.co/300x300/212529/ffc107?text=Cleats"
                  className="card-img-top p-3"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Nike Mercurial Superfly 9</h5>
                  <p className="card-text text-warning fw-bold">£189.99</p>
                </div>
                <div className="card-footer bg-white border-0 pb-3">
                  <button className="btn btn-warning w-100">
                    Add to Cart <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="https://placehold.co/300x300/212529/ffc107?text=Basketball"
                  className="card-img-top p-3"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Wilson Evolution Basketball</h5>
                  <p className="card-text text-warning fw-bold">£59.99</p>
                </div>
                <div className="card-footer bg-white border-0 pb-3">
                  <button className="btn btn-warning w-100">
                    Add to Cart <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Product Card 4 */}
            <div className="col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="https://placehold.co/300x300/212529/ffc107?text=Running+Shoes"
                  className="card-img-top p-3"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Adidas Ultraboost 22</h5>
                  <p className="card-text text-warning fw-bold">£219.99</p>
                </div>
                <div className="card-footer bg-white border-0 pb-3">
                  <button className="btn btn-warning w-100">
                    Add to Cart <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="#" className="btn btn-outline-warning btn-lg px-5">
              View All Products
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;