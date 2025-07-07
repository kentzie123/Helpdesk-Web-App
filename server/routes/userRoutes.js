const express = require('express');
const router = express.Router();
const { loginUser, getAllUsers, createUser, updateUser, deleteUser, signUpGenerateConfirmationCode} = require('../controllers/userController');

router.post('/signup/generate-code', signUpGenerateConfirmationCode)
router.post('/signup/create-account', createUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser); 
router.delete('/users/:id', deleteUser);

module.exports = router;
    