const express = require('express');
const router = express.Router();

const { 
    loginUser 
} = require('../controllers/authController');

const verifyToken = require('../middleware/verifyToken');

router.post('/login', loginUser);
router.get('/me', verifyToken, async (req, res) => {
  try {
    // Return user info from the token
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;