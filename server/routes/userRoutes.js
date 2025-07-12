const express = require('express');
const router = express.Router();
const { requireRole } = require('../middleware/requireRoleVerifyToken');
const verifyToken = require('../middleware/verifyToken');

const { getAllUsers, createUser, updateUser, deleteUser, signUpGenerateConfirmationCode} = require('../controllers/userController');

router.post('/signup/generate-code', signUpGenerateConfirmationCode)
router.post('/signup/create-account', createUser);
router.get('/users', requireRole('Admin'), getAllUsers);
router.patch('/users/:id', verifyToken, updateUser); 
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;
    