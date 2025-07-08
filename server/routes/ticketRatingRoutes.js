const express = require('express');
const router = express.Router();

const {
    createTicketRating,
    getTicketRatingsByTicketId,
    deleteTicketRating
} = require('../controllers/ticketRatingController');

router.post('/ticket-ratings', createTicketRating);
router.get('/ticket-ratings/:ticketId', getTicketRatingsByTicketId);
router.delete('/ticket-ratings/:ratingId', deleteTicketRating);

module.exports = router;