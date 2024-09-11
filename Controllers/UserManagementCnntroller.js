const User = require('../Model/UserMangementModel.js'); // Make sure the path to your Sequelize User model is correct

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { userName, emailAddress, password, role, privileges } = req.body;
    
    // Create a new user instance
    const user = await User.create({
      userName,
      emailAddress,
      password,
      role,
      privileges
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, emailAddress, password, role, privileges } = req.body;

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user with the provided data
    await user.update({
      userName,
      emailAddress,
      password,
      role,
      privileges
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete an existing user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
};
