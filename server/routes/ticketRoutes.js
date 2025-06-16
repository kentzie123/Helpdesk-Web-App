const express = require('express');
const router = express.Router();
const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketsByRole
} = require('../controllers/ticketController');

// Routes
router.get('/tickets/by-role', getTicketsByRole);
router.get('/tickets', getAllTickets);
router.get('/tickets/:ticketId', getTicketById);
router.post('/tickets', createTicket);
router.delete('/tickets/:ticketId', deleteTicket);
router.patch('/tickets/:ticketId', updateTicket);


module.exports = router;
