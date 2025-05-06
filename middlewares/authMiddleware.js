const jwt = require('jsonwebtoken');

const authMiddleware = {
  authenticate: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  },

  isFournisseur: (req, res, next) => {
    if (req.user.role !== 'fournisseur') {
      return res.status(403).json({ message: 'Access denied. Fournisseur role required' });
    }
    next();
  }
};

module.exports = authMiddleware;