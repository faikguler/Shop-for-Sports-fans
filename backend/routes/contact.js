const router = require('express').Router();
const { createMessage, getAllMessages, deleteMessage } = require('../controllers/contactController');
const { authMiddleware, adminMiddleware } = require('../utils/auth');

// Public route
router.post('/', createMessage);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllMessages);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMessage);

module.exports = router;