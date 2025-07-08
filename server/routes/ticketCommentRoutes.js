const express = require('express');
const router = express.Router();

const {
    createTicketComment,
    getTicketComments,
    deleteTicketComment
} = require('../controllers/ticketCommentController');

module.exports = router;