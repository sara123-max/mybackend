const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/login', authController.login);
router.post('/logout', authMiddleware.authenticate, authController.logout);

// Protected route example
router.get('/profile', authMiddleware.authenticate, authMiddleware.isFournisseur, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;