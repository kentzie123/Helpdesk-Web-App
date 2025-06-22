const express = require('express');
const router = express.Router();
const { getPagePrivilegeByRoleId } = require('../controllers/pagePrivilegeController');

router.get('/privilege/:roleId', getPagePrivilegeByRoleId);

module.exports = router;