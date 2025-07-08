const express = require('express');
const router = express.Router();

const {
    createTicketComment,
    getTicketComments,
    deleteTicketComment
} = require('../controllers/ticketCommentController');

router.post('/ticket-comments', createTicketComment);
router.get('/ticket-comments/:ticketId', getTicketComments);
router.delete('/ticket-comments/:commentId', deleteTicketComment);

module.exports = router;