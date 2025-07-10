const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/userModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    console.log("user====>", user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Input password:", password);
    console.log("Stored hash:", user.password);
    console.log("isMatch:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//get profile api
const { findUserById } = require('../models/userModel');

exports.getProfile = async (req, res) => {
  try {
    // console.log("Decoded JWT user info:", req.user); 
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return only safe fields
    const { id, email, name, role, skills, seniority, max_capacity, department,current_capacity } = user;
    res.json({ id, email, name, role, skills, seniority, max_capacity, department,current_capacity });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
