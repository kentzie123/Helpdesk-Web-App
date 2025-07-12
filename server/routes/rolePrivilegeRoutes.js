const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const { getRoleByRoleId, getRoles } = require('../controllers/rolePrivilegeController');

router.get('/roles/:id', verifyToken, getRoleByRoleId);
router.get('/roles', verifyToken, getRoles);

module.exports = router;