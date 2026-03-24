import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import API from '../../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    categoryId: '',
  });
  
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageSelect = (e) => {
    let files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can upload maximum 5 images');
      files = files.slice(0, 5);
    }
    setNewImageFiles(files);
    const urls = files.map(file => URL.createObjectURL(file));
    setNewPreviewUrls(urls);
  };

  const handleRemoveExistingImage = (urlToRemove) => {
    setExistingImages(prev => prev.filter(url => url !== urlToRemove));
  };

  const handleRemoveNewImage = (index) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let uploadedUrls = [];

      if (newImageFiles.length > 0) {
        const uploadFormData = new FormData();
        newImageFiles.forEach(file => uploadFormData.append('images', file));
       const uploadRes = await API.post('/upload/images', uploadFormData);
        uploadedUrls = uploadRes.data.imageUrls;
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const payload = {
        ...formData,
        images: finalImages,
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
      } else {
        await productService.create(payload);
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        brand: '',
        categoryId: '',
      });
      setExistingImages([]);
      setNewImageFiles([]);
      setNewPreviewUrls([]);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      brand: product.brand || '',
      categoryId: product.categoryId,
    });
    setExistingImages(product.images || []);
    setNewImageFiles([]);
    setNewPreviewUrls([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await productService.delete(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const efix = (e) => {
  if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
    e.preventDefault();
  }
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Product Management</h2>

      <div className="card mb-4">
        <div className="card-header">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  onKeyDown={efix}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  onKeyDown={efix}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Existing images */}
              {existingImages.length > 0 && (
                <div className="col-12 mb-3">
                  <label className="form-label">Current Images</label>
                  <div className="d-flex flex-wrap gap-2">
                    {existingImages.map((url, idx) => (
                      <div key={idx} className="position-relative">
                        <img
                          src={url}
                          alt="product"
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0"
                          style={{ borderRadius: '50%', padding: '0 4px', fontSize: '12px' }}
                          onClick={() => handleRemoveExistingImage(url)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New image upload */}
              <div className="col-12 mb-3">
                <label className="form-label">Add New Images (max 5)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
                <small className="text-muted">You can select up to 5 new images.</small>
              </div>

              {/* New image previews */}
              {newPreviewUrls.length > 0 && (
                <div className="col-12 mb-3">
                  <label className="form-label">New Images Preview</label>
                  <div className="d-flex flex-wrap gap-2">
                    {newPreviewUrls.map((url, idx) => (
                      <div key={idx} className="position-relative">
                        <img
                          src={url}
                          alt="preview"
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0"
                          style={{ borderRadius: '50%', padding: '0 4px', fontSize: '12px' }}
                          onClick={() => handleRemoveNewImage(idx)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary me-2" disabled={uploading}>
              {uploading ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
            </button>
            {editingProduct && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    stock: '',
                    brand: '',
                    categoryId: '',
                  });
                  setExistingImages([]);
                  setNewImageFiles([]);
                  setNewPreviewUrls([]);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-header">Products List</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>£{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category?.name || product.categoryId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;