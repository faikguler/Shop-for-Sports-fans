const router = require('express').Router();
const uploadProducts = require('../middleware/upload');
const uploadSlider = require('../middleware/uploadSlider'); 
const { authMiddleware, adminMiddleware } = require('../utils/auth');

router.post('/products', authMiddleware, adminMiddleware, uploadProducts.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const imageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
    res.json({ imageUrls });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Slider uploads
router.post('/sliders', authMiddleware, adminMiddleware, uploadSlider.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const imageUrls = req.files.map(file => `/uploads/slider/${file.filename}`);
    res.json({ imageUrls });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;