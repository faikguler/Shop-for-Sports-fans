const router = require('express').Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');
const { authMiddleware, adminMiddleware } = require('../utils/auth');
const upload = require('../middleware/upload');

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// just admin
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;