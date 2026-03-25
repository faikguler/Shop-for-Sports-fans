const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { authMiddleware, adminMiddleware } = require('../utils/auth');

router.post('/', newsletterController.subscribe);

router.get('/', authMiddleware, adminMiddleware, newsletterController.getAll);
router.put('/:email', authMiddleware, adminMiddleware, newsletterController.toggleActive);
router.delete('/:email', authMiddleware, adminMiddleware, newsletterController.delete);

module.exports = router;