import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Filter products by selected category
  const filteredProducts = selectedCategoryId
    ? products.filter(product => product.categoryId === selectedCategoryId)
    : products;

  if (loading) {
    return <div className="text-center my-5">Loading products...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  return (
    <>
      {/* Categories Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold border-bottom border-warning border-3 pb-2 d-inline-block mx-auto">
            Categories
          </h2>
          <div className="row g-4 text-center">
            {/* All category */}
            <div className="col-md-3 col-6">
              <div
                className={`card border-0 shadow-sm p-3 ${selectedCategoryId === null ? 'bg-warning text-dark' : 'bg-white'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedCategoryId(null)}
              >
                <h5 className="mt-3">All</h5>
              </div>
            </div>
            {/* Dynamic categories */}
            {categories.map(category => (
              <div key={category.id} className="col-md-3 col-6">
                <div
                  className={`card border-0 shadow-sm p-3 ${selectedCategoryId === category.id ? 'bg-warning text-dark' : 'bg-white'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <h5 className="mt-3">{category.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {filteredProducts.length === 0 ? (
              <div className="col-12 text-center">
                <p>No products found in this category.</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border-0">
                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/300x300/212529/ffc107?text=No+Image'}
                        className="card-img-top p-3"
                        alt={product.name}
                        style={{ objectFit: 'cover', height: '200px' }}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-warning fw-bold">£{product.price}</p>
                    </div>
                    <div className="card-footer bg-white border-0 pb-3">
                      <button
                        className="btn btn-warning w-100"
                        onClick={() => {
                          addToCart(product, 1);
                        }}
                      >
                        Add to Cart <i className="bi bi-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;