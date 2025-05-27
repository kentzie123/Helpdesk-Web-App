const express = require('express');
const router = express.Router();
const { getRoleById, getRoles } = require('../controllers/rolePrivilegeController');

router.get('/roles/:id', getRoleById);
router.get('/roles', getRoles);

module.exports = router;