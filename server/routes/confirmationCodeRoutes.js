const express = require('express');
const router = express.Router();

const {
    generateConfirmationCode
} = require('../controllers/confirmationCodeController');

router.post('/confirmation-code', generateConfirmationCode);

module.exports = router;