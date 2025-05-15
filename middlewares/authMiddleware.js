const jwt = require('jsonwebtoken');

const authMiddleware = {
  authenticate: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('Authorization header missing');
      return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
      console.log('Decoded token payload:', decoded); // Add this line
      req.user = decoded;
      next();
    } catch (error) {
      console.log('Token verification failed:', error.message);
      res.status(401).json({ message: 'Invalid token' });
    }
  },

  isFournisseur: (req, res, next) => {
    if (req.user.role !== 'fournisseur') {
      return res.status(403).json({ message: 'Access denied. Fournisseur role required' });
    }
    next();
  },
  isGrossiste: (req, res, next) => {
    if (req.user.role !== 'grossiste') {
      return res.status(403).json({ message: 'Access denied. Grossiste role required' });
    }
    next();
  },
  
  isPointVente: (req, res, next) => {
    if (req.user.role !== 'point_vente') {
      return res.status(403).json({ message: 'Access denied. Point de vente role required' });
    }
    next();
  }
};

module.exports = authMiddleware;