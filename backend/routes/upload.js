const router = require('express').Router();
const upload = require('../middleware/upload');
const { authMiddleware, adminMiddleware } = require('../utils/auth');

// 1 upload
router.post('/image', authMiddleware, adminMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/products/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// max 5 upload
router.post('/images', authMiddleware, adminMiddleware, upload.array('images', 5), (req, res) => {
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

module.exports = router;