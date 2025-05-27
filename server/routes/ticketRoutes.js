const express = require('express');
const router = express.Router();
const { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket  } = require('../controllers/ticketController');


router.get('/tickets', getAllTickets);
router.get('/tickets/:ticketId', getTicketById);
router.post('/create', createTicket);
router.delete('/tickets/:ticketId', deleteTicket);
router.patch('/tickets/:ticketId', updateTicket);

module.exports = router;