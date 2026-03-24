const router = require('express').Router();
const {
  getAllpages,
  getpageById,
  getpageByName,
  createpage,
  updatepage,
  deletepage,
} = require('../controllers/page');
const { authMiddleware, adminMiddleware } = require('../utils/auth');
//public
router.get('/', getAllpages);
router.get('/:id', getpageById);
router.get('/by-name/:name', getpageByName);


//for admin
router.post('/', authMiddleware, adminMiddleware, createpage);
router.put('/:id', authMiddleware, adminMiddleware, updatepage);
router.delete('/:id', authMiddleware, adminMiddleware, deletepage);

module.exports = router;