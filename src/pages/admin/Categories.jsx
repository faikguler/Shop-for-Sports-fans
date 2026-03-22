import { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await categoryService.update(editingCategory.id, formData);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await categoryService.create(formData);
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Category Management</h2>

      {/* Create and Edit Form */}
      <div className="card mb-4">
        <div className="card-header">
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </div>
        <div className="card-body">
          <form onSubmit={editingCategory ? handleUpdate : handleCreate}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description (optional)</label>
              <textarea
                className="form-control"
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">
              {editingCategory ? 'Update' : 'Create'}
            </button>
            {editingCategory && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Categories Table */}
      <div className="card">
        <div className="card-header">Categories List</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat.id)}
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

export default AdminCategories;