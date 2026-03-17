const router = require('express').Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
const { authMiddleware, adminMiddleware } = require('../utils/auth');
//public
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);


//for admin
router.post('/', authMiddleware, adminMiddleware, createCategory);
router.put('/:id', authMiddleware, adminMiddleware, updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;