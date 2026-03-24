import { useState, useEffect } from 'react';
import { pageService } from '../../services/pageService';
import { Editor } from '@tinymce/tinymce-react';

const Adminpages = () => {
  const [pages, setpages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingpage, setEditingpage] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '',  location: 'header', });

  useEffect(() => {
    fetchpages();
  }, []);

  const fetchpages = async () => {
    try {
      const res = await pageService.getAll();
      setpages(res.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await pageService.delete(id);
        setpages(pages.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const handleEdit = (page) => {
    setEditingpage(page);
    setFormData({ name: page.name, description: page.description || '' ,  location: page.location || 'header',});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await pageService.update(editingpage.id, formData);
      setEditingpage(null);
      fetchpages();
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await pageService.create(formData);
      setFormData({ name: '', description: '' });
      fetchpages();
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  if (loading) return <div>Loading pages...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">page Management</h2>

      {/* Create and Edit Form */}
      <div className="card mb-4">
        <div className="card-header">
          {editingpage ? 'Edit page' : 'Add New page'}
        </div>
        <div className="card-body">
          <form onSubmit={editingpage ? handleUpdate : handleCreate}>
            <div className="mb-3">
              <label className="form-label">page Name</label>
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
              <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                value={formData.description}
                onEditorChange={(content) => setFormData({ ...formData, description: content })}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>
            

            <div className="mb-3">
              <label className="form-label">Location</label>
              <select
                className="form-select"
                value={formData.location || 'header'}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                <option value="header">Header Menu</option>
                <option value="footer">Footer Menu</option>
              </select>
            </div>  

            <button type="submit" className="btn btn-primary me-2">
              {editingpage ? 'Update' : 'Create'}
            </button>
            {editingpage && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingpage(null)}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* pages Table */}
      <div className="card">
        <div className="card-header">pages List</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(cat => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>{cat.location || 'header'}</td>
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

export default Adminpages;