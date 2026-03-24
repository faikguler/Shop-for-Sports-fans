import { useState, useEffect } from 'react';
import { sliderService } from '../../services/sliderService';

const Adminsliders = () => {
  const [sliders, setsliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingslider, setEditingslider] = useState(null);
  const [formData, setFormData] = useState({ img: '' });

  useEffect(() => {
    fetchsliders();
  }, []);

  const fetchsliders = async () => {
    try {
      const res = await sliderService.getAll();
      setsliders(res.data);
    } catch (error) {
      console.error('Error fetching sliders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slider?')) {
      try {
        await sliderService.delete(id);
        setsliders(sliders.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting slider:', error);
      }
    }
  };

  const handleEdit = (slider) => {
    setEditingslider(slider);
    setFormData({ img: slider.img});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await sliderService.update(editingslider.id, formData);
      setEditingslider(null);
      fetchsliders();
    } catch (error) {
      console.error('Error updating slider:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await sliderService.create(formData);
      setFormData({ img: ''});
      fetchsliders();
    } catch (error) {
      console.error('Error creating slider:', error);
    }
  };

  if (loading) return <div>Loading sliders...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">slider Management</h2>

      {/* Create and Edit Form */}
      <div className="card mb-4">
        <div className="card-header">
          {editingslider ? 'Edit slider' : 'Add New slider'}
        </div>
        <div className="card-body">
          <form onSubmit={editingslider ? handleUpdate : handleCreate}>
            <div className="mb-3">
              <label className="form-label">slider Name</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                />
            </div>
           
         

            <button type="submit" className="btn btn-primary me-2">
              {editingslider ? 'Update' : 'Create'}
            </button>
            {editingslider && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingslider(null)}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* sliders Table */}
      <div className="card">
        <div className="card-header">sliders List</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map(cat => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.img}</td>
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

export default Adminsliders;