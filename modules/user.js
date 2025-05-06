const bcrypt = require('bcryptjs');
const pool = require('../pool');

class User {
  static async findByUsername(username) {
    const [rows] = await pool.query(
      'SELECT user.*, fournisseur.user_id IS NOT NULL AS is_fournisseur ' +
      'FROM user LEFT JOIN fournisseur ON user.id = fournisseur.user_id ' +
      'WHERE username = ?', 
      [username]
    );
    return rows[0];
  }

  static async verifyFournisseur(username, password) {
    const user = await this.findByUsername(username);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if password is hashed (starts with $2b$)
    if (user.password.startsWith('$2b$')) {
      // Compare with bcrypt for hashed passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }
    } else {
      // Compare directly for plaintext passwords (legacy)
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
      
      // Optional: Upgrade plaintext password to hash
      // await this.upgradePassword(user.id, password);
    }
    
    if (!user.is_fournisseur) {
      throw new Error('User is not a fournisseur');
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
}

module.exports = User;