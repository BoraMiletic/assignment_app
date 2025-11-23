const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findByUsernameOrEmail(username, email);
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
