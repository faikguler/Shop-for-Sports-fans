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
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    // Önizleme URL'leri oluştur
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('description', formData.description);
    formPayload.append('price', formData.price);
    formPayload.append('stock', formData.stock);
    formPayload.append('brand', formData.brand);
    formPayload.append('categoryId', formData.categoryId);

    imageFiles.forEach(file => {
      formPayload.append('images', file);
    });

    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, formPayload);
      } else {
        await productService.create(formPayload);
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        brand: '',
        categoryId: '',
      });
      setImageFiles([]);
      setPreviewUrls([]);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
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
              <div className="col-12 mb-3">
                <label className="form-label">Product Images (max 5)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                {previewUrls.length > 0 && (
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {previewUrls.map((url, idx) => (
                      <img key={idx} src={url} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary me-2">
              {editingProduct ? 'Update' : 'Create'}
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
                  setImageFiles([]);
                  setPreviewUrls([]);
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
                      <img src={product.images[0]} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>${product.price}</td>
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