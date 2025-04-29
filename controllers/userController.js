/*const User = require('../models/user');


// Controller to create a new user
const createUser = (req, res) => {
  const { name, email, telephone_number, role, region, address, username, password } = req.body;

  const userData = { 
    name, 
    email, 
    telephone_number, 
    role, 
    region, 
    address, 
    username, 
    password,
  };

  // Create the user in the database
  User.createUser(userData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });
};

// Controller for user login (authentication)
const authenticateUser = (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  User.getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // If user doesn't exist, return error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      // If passwords do not match, return error
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // If passwords match, return success message with user data
      return res.status(200).json({ message: 'Login successful', user });
    });
  });
};

// Controller to update user details
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, telephone_number, role, region, address, username, password } = req.body;

  const updatedData = { 
    name, 
    email, 
    telephone_number, 
    role, 
    region, 
    address, 
    username 
  };

  if (password) {
    updatedData.password = password; // Include the password for hashing in the model
  }

  // Update user in the database
  User.updateUser(id, updatedData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: 'User updated successfully' });
  });
};

module.exports = {
  createUser,
  authenticateUser
};
*/