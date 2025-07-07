const User = require('../models/user');
const ConfirmationCode = require('../models/confirmationCode');
const sendEmail = require('../utils/sendEmail');

const bcrypt = require('bcryptjs');

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};

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

    // Return minimal user data (exclude password)
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


const signUpGenerateConfirmationCode = async (req, res) => {
  const { email, password, fullname } = req.body;
  const code = generateCode();

  if (!email || !password || !fullname) {
    return res.status(400).json({ error: 'Please fill all required fields.'})
  }

  try {
    const emailExist = await User.findOne({ email });

    if(emailExist){
      return res.status(409).json({ error: 'Email already used.' })
    }
 
    const recentCode = await ConfirmationCode.findOne({ userEmail: email }).sort({ createdAt: -1 });

    const newConfirmationCode = new ConfirmationCode({
      userEmail: email,
      code
    });

    await newConfirmationCode.save();
    await sendEmail(email, code);

    return res.status(200).json({ message: 'Confirmation code created and sent.' });

  } catch (err) {
    console.error('Error generating confirmation code:', err);
    return res.status(500).json({ error: 'Server error while generating confirmation code.' });
  }
};



// Create a new user
const createUser = async (req, res) => {
  const { email, password, fullname, code } = req.body;

  if (!email || !password || !fullname) {
      return res.status(400).json({ error: 'Missing required fields. Please refresh the page and try again.' });
  }

  if (!code) {
      return res.status(400).json({ error: 'Please enter the verification code.' });
    }
  
  try {
    const record = await ConfirmationCode.findOne({ userEmail: email, code });

    if (!record) {
      return res.status(404).json({ error: 'Invalid or expired code.' });
    } 

    const isExpired = new Date() > new Date(record.expiresAt);
    if (isExpired) {
      return res.status(410).json({ error: 'Code has expired.' });
    }

    // Input validation
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    await ConfirmationCode.deleteMany({ userEmail: email });

    const newUser = new User({
      email,
      password, 
      fullname,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' } );

  } catch(err){
    return res.status(500).json({ error: 'Server error while verifying code.'});
  }
};

const updateUser = async (req, res) => {
    const { id } = req.params; // User ID from URL
    const { email, password, fullname, role } = req.body;
  
    // Validate required fields
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      // 1. Find the user
      const user = await User.findOne({ userID: id }); // Using your custom userID
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // 2. Prevent email duplication (if email is being updated)
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ error: 'Email already in use' });
        }
        user.email = email;
      }
  
      // 3. Update fields (excluding password for security)
      if (fullname) user.fullname = fullname;
      if (role) user.role = role;
  
      // 4. Handle password update separately (hash if changed)
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      // 5. Save changes
      await user.save();
  
      // 6. Return updated user (excluding password)
      res.json({
        message: 'User updated successfully',
        user: {
          userID: user.userID,
          email: user.email,
          fullname: user.fullname,
          role: user.role
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error while updating user' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params; // Extract userID from URL
    
    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Find and delete the user by userID (not MongoDB's default _id)
        const deletedUser = await User.findOneAndDelete({ userID: id });
        
        if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
        }

        // Return success (without sensitive data)
        res.json({
        message: 'User deleted successfully',
        deletedUser: {
            userID: deletedUser.userID,
            email: deletedUser.email,
            fullname: deletedUser.fullname
        }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error while deleting user' });
    }
};

module.exports = {
  loginUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  signUpGenerateConfirmationCode
};