import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import ReviewSection from '../components/ReviewSection';

const ProductDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // main image URL
  const { addToCart } = useCart();

  useEffect(() => {
    productService.getById(id)
      .then(res => {
        setProduct(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(res.data.images[0]); // first image as main
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!product) return <div className="alert alert-danger">Product not found</div>;

  const images = product.images || [];
  const hasImages = images.length > 0;

  return (
    <div className="container py-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="row">
        {/* Image Gallery */}
        <div className="col-md-6">
          <div className="mb-3">
            {hasImages ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="img-fluid rounded shadow"
                style={{ width: '100%', objectFit: 'contain', height: '400px' }}
              />
            ) : (
              <div className="bg-light d-flex align-items-center justify-content-center rounded shadow" style={{ height: '400px' }}>
                No Image
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {hasImages && images.length > 1 && (
            <div className="d-flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="img-thumbnail"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImage === img ? '2px solid #ffc107' : 'none',
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="display-5">{product.name}</h1>
          <p className="text-muted">Brand: {product.brand || 'N/A'}</p>
          <p className="lead">{product.description}</p>
          <h3 className="text-warning">£{product.price}</h3>
          <p>Stock: {product.stock}</p>
          <div className="d-flex align-items-center gap-3 mt-4">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="form-control"
              style={{ width: '80px' }}
            />
            <button
              className="btn btn-warning btn-lg"
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? 'Added!' : 'Add to Cart'} <i className="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <ReviewSection productId={product.id} user={user} />
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;