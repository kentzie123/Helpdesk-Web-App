const express = require('express');
const router = express.Router();
const { requireRole } = require('../middleware/requireRoleVerifyToken');
const verifyToken = require('../middleware/verifyToken');


const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketsByRole,
  deleteSelectedTickets
} = require('../controllers/ticketController');

// Routes
router.get('/tickets/by-role', verifyToken, getTicketsByRole);
router.get('/tickets', requireRole(1), getAllTickets);
router.get('/tickets/:ticketId', verifyToken, getTicketById);
router.post('/tickets', verifyToken, createTicket);
router.delete('/tickets/:ticketId', verifyToken, deleteTicket);
router.delete('/tickets/delete-tickets', verifyToken, deleteSelectedTickets);
router.patch('/tickets/:ticketId', verifyToken, updateTicket);


module.exports = router;
