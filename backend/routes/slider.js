const router = require('express').Router();
const {
  getAllSliders,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider,
} = require('../controllers/slider'); //potential error? 
const { authMiddleware, adminMiddleware } = require('../utils/auth');
//public
router.get('/', getAllSliders);
router.get('/:id', getSliderById);


//for admin
router.post('/', authMiddleware, adminMiddleware, createSlider);
router.put('/:id', authMiddleware, adminMiddleware, updateSlider);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSlider);

module.exports = router;