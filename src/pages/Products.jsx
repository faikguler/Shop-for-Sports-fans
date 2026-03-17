const Product = () => {
  return (
    <>
        {/* Navbar - sticky top */}
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold fs-3" href="#">
        <i class="bi bi-trophy-fill text-warning me-2"></i>SportShop
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search products..." aria-label="Search"/>
          <button class="btn btn-outline-light" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <a href="#" class="btn btn-outline-light ms-2">
          <i class="bi bi-cart3"></i> <span class="badge bg-warning text-dark">3</span>
        </a>
        <a href="#" class="btn btn-warning ms-2">
          <i class="bi bi-person-circle"></i> Login
        </a>
      </div>
    </div>
  </nav>



  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-5 fw-bold border-bottom border-warning border-3 pb-2 d-inline-block mx-auto">Categories</h2>
      <div class="row g-4 text-center">
        <div class="col-md-3 col-6">
          <div class="card border-0 bg-white shadow-sm p-3">
            <h5 class="mt-3">Cycling</h5>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border-0 bg-white shadow-sm p-3">
            <h5 class="mt-3">Basketball</h5>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border-0 bg-white shadow-sm p-3">
            <h5 class="mt-3">Football</h5>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border-0 bg-white shadow-sm p-3">
            <h5 class="mt-3">Fitness</h5>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <div class="row g-4">
        {/* Product 1 */}
        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Jersey" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Fenerbahçe 2024/25 Home Jersey</h5>
              <p class="card-text text-warning fw-bold">£89.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>
        {/* Product 2 */}
        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Cleats" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Nike Mercurial Superfly 9</h5>
              <p class="card-text text-warning fw-bold">£189.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>
        {/* Product 3 */}
        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Basketball" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Wilson Evolution Basketball</h5>
              <p class="card-text text-warning fw-bold">£59.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>
        { /* Product 4 */}
        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Running+Shoes" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Adidas Ultraboost 22</h5>
              <p class="card-text text-warning fw-bold">£219.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>



        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Running+Shoes" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Adidas Ultraboost 22</h5>
              <p class="card-text text-warning fw-bold">£219.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>


        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Running+Shoes" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Adidas Ultraboost 22</h5>
              <p class="card-text text-warning fw-bold">£219.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>


        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Running+Shoes" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Adidas Ultraboost 22</h5>
              <p class="card-text text-warning fw-bold">£219.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>


        <div class="col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://placehold.co/300x300/212529/ffc107?text=Running+Shoes" class="card-img-top p-3" alt="Product"/>
            <div class="card-body">
              <h5 class="card-title">Adidas Ultraboost 22</h5>
              <p class="card-text text-warning fw-bold">£219.99</p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button class="btn btn-warning w-100">Add to Cart <i class="bi bi-cart-plus"></i></button>
            </div>
          </div>
        </div>



        
      </div>

      
    </div>
  </section>

    </>
  )
};
export default Product;