const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

     // ✅ Generate JWT
    const token = jwt.sign(
      { userID: user.userID, role: user.role }, // you can add more fields if needed
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Store JWT in HttpOnly cookie
    res.cookie('access', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true if live, false for localhost
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour in ms
    });

    res.json({ 
      message: 'Login successful', 
      user: { 
        userID: user.userID, 
        profilePic: user.profilePic,
        email: user.email, 
        fullname: user.fullname, 
        role: user.role 
      } 
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

module.exports = {
    loginUser
}