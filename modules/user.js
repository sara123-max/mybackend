const bcrypt = require('bcryptjs');
const pool = require('../pool');

class User {
  static async findByUsername(username) {
    const [rows] = await pool.query(
      'SELECT user.*, ' +
      'fournisseur.user_id IS NOT NULL AS is_fournisseur, ' +
      'grossiste.user_id IS NOT NULL AS is_grossiste, ' +
      'sale_point.user_id IS NOT NULL AS is_point_vente ' +
      'FROM user ' +
      'LEFT JOIN fournisseur ON user.id = fournisseur.user_id ' +
      'LEFT JOIN grossiste ON user.id = grossiste.user_id ' +
      'LEFT JOIN sale_point ON user.id = sale_point.user_id ' +
      'WHERE username = ?', 
      [username]
    );
    return rows[0];
  }

  static async verifyUser(username, password, requiredRole = null) {
    const user = await this.findByUsername(username);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Password verification (same as before)
    if (user.password.startsWith('$2b$')) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }
    } else {
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
    }
    
    // Check if user has the required role (if specified)
    if (requiredRole) {
      if (user.role !== requiredRole) {
        throw new Error(`User is not a ${requiredRole}`);
      }
      
      // For role-specific tables (fournisseur, grossiste, sale_point)
      if (requiredRole === 'fournisseur' && !user.is_fournisseur) {
        throw new Error('User is not a fournisseur');
      }
      if (requiredRole === 'grossiste') {
        const [grossiste] = await pool.query('SELECT 1 FROM grossiste WHERE user_id = ?', [user.id]);
        if (!grossiste.length) {
          throw new Error('User is not a grossiste');
        }
      }
      if (requiredRole === 'point_vente') {
        const [pointVente] = await pool.query('SELECT 1 FROM sale_point WHERE user_id = ?', [user.id]);
        if (!pointVente.length) {
          throw new Error('User is not a point_vente');
        }
      }
    }
    
    return user;
  }

  static async upgradePassword(userId, plainPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    
    await pool.query(
      'UPDATE user SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );
  }

  // Keep the old method for backward compatibility
static async verifyFournisseur(username, password) {
  return this.verifyUser(username, password, 'fournisseur');
}

// Add new methods for other roles
static async verifyGrossiste(username, password) {
  return this.verifyUser(username, password, 'grossiste');
}

static async verifyPointVente(username, password) {
  return this.verifyUser(username, password, 'point_vente');
}
}

module.exports = User;