import { useState, useEffect } from 'react';
import { sliderService } from '../../services/sliderService';
import API from '../../services/api';

const Adminsliders = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSlider, setEditingSlider] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await sliderService.getAll();
      setSliders(res.data);
    } catch (error) {
      console.error('Error fetching sliders:', error);
    } finally {
      setLoading(false);
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

  const handleRemoveExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
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
        const uploadRes = await API.post('/upload/sliders', uploadFormData);
        uploadedUrls = uploadRes.data.imageUrls;
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      if (editingSlider) {
        await sliderService.update(editingSlider.id, { img: finalImages });
      } else {
        await sliderService.create({ img: finalImages });
      }

      setExistingImages([]);
      setNewImageFiles([]);
      setNewPreviewUrls([]);
      setEditingSlider(null);
      fetchSliders();
    } catch (error) {
      console.error('Error saving slider:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (slider) => {
    setEditingSlider(slider);
    setExistingImages(slider.img || []);
    setNewImageFiles([]);
    setNewPreviewUrls([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slider?')) {
      try {
        await sliderService.delete(id);
        setSliders(sliders.filter(s => s.id !== id));
      } catch (error) {
        console.error('Error deleting slider:', error);
      }
    }
  };

  if (loading) return <div>Loading sliders...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Slider Management</h2>

      <div className="card mb-4">
        <div className="card-header">
          {editingSlider ? 'Edit Slider' : 'Add New Slider'}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Current Images</label>
                <div className="d-flex flex-wrap gap-2">
                  {existingImages.map((url, idx) => (
                    <div key={idx} className="position-relative">
                      <img
                        src={url}
                        alt="slide"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        style={{ borderRadius: '50%', padding: '0 4px', fontSize: '12px' }}
                        onClick={() => handleRemoveExistingImage(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Image Upload */}
            <div className="mb-3">
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

            {/* New Image Previews */}
            {newPreviewUrls.length > 0 && (
              <div className="mb-3">
                <label className="form-label">New Images Preview</label>
                <div className="d-flex flex-wrap gap-2">
                  {newPreviewUrls.map((url, idx) => (
                    <div key={idx} className="position-relative">
                      <img
                        src={url}
                        alt="preview"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
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

            <button type="submit" className="btn btn-primary me-2" disabled={uploading}>
              {uploading ? 'Saving...' : (editingSlider ? 'Update' : 'Create')}
            </button>
            {editingSlider && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingSlider(null);
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

      {/* Sliders Table */}
      <div className="card">
        <div className="card-header">Sliders List</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map(slider => (
                <tr key={slider.id}>
                  <td>{slider.id}</td>
                  <td>
                    {slider.img && slider.img.length > 0 ? (
                      <div className="d-flex gap-1">
                        {slider.img.slice(0, 3).map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt="slide"
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '2px' }}
                          />
                        ))}
                        {slider.img.length > 3 && <span>+{slider.img.length - 3}</span>}
                      </div>
                    ) : 'No images'}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(slider)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(slider.id)}
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