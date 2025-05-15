const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Debug: Check if controllers are properly imported
console.log('authController:', authController);
console.log('authMiddleware:', authMiddleware);


// Public routes
router.post('/login', authController.login);
router.post('/logout', authMiddleware.authenticate, authController.logout);

// Protected routes
router.get('/profile', authMiddleware.authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Role-specific routes
router.get('/fournisseur/profile', authMiddleware.authenticate, authMiddleware.isFournisseur, (req, res) => {
  res.json({ user: req.user });
});

router.get('/grossiste/profile', authMiddleware.authenticate, authMiddleware.isGrossiste, (req, res) => {
  res.json({ user: req.user });
});

router.get('/point-vente/profile', authMiddleware.authenticate, authMiddleware.isPointVente, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;