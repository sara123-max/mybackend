/*const User = require('../modules/user');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Verify user credentials
      const user = await User.verifyFournisseur(username, password);
      
      // Create session token (JWT)
      const token = jwt.sign(
        { 
          userId: user.id, 
          role: user.role,
          username: user.username 
        },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1h' }
      );
      
      res.json({ 
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
      
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        message: error.message 
      });
    }
  },

  logout: (req, res) => {
    // Since we're using JWT, logout is client-side by discarding the token
    res.json({ success: true, message: 'Logged out successfully' });
  }
};

module.exports = authController;
*/
const User = require('../modules/user');
const jwt = require('jsonwebtoken');

const authController = {
login: async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    let user;
    switch(role) {
      case 'fournisseur':
        user = await User.verifyFournisseur(username, password);
        break;
      case 'grossiste':
        user = await User.verifyGrossiste(username, password);
        break;
      case 'point_vente':
        user = await User.verifyPointVente(username, password);
        break;
      default:
        // Generic login without role verification
        user = await User.verifyUser(username, password);
    }
    

    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role,
        username: user.username 
      },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );
    
    res.json({ 
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: error.message 
    });
  }
},
logout: (req, res) => {
  // Since we're using JWT, logout is client-side by discarding the token
  res.json({ success: true, message: 'Logged out successfully' });
}
};
module.exports = authController;