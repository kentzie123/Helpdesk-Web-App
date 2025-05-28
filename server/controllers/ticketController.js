const Ticket = require('../models/tickets');

// GET all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching tickets' });
  }
};

// GET ticket by ID
const getTicketById = async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    const ticket = await Ticket.findOne({ticketId: ticketId});

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching the ticket' });
  }
};

// Create a new ticket
const createTicket = async (req, res) => {
  const { ownerName, subject, priority, category, description, assignedTo, status, targetResolveDate } = req.body

  if(!ownerName || !subject || !priority || !category || !assignedTo || !targetResolveDate){
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try{
    const newTicket = new Ticket({
      ownerPic,
      ownerName, 
      subject, 
      priority, 
      category, 
      description, 
      assignedTo, 
      status: 'Open', 
      targetResolveDate
    })
    await newTicket.save();

  } catch (err) {
    res.status(500).json({ error: 'Server error while creating ticket' });
  }
  
}

const deleteTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const deletedTicket = await Ticket.findOneAndDelete({ ticketId });

    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while deleting ticket' });
  }
};


// Update a ticket
const updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const {
    ownerName,
    subject,
    priority,
    category,
    description,
    assignedTo,
    status,
    modifiedBy,
    resolvedDate,
    targetResolveDate,
    lastModifiedDate
  } = req.body;

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { ticketId: ticketId },
      {
        ownerName,
        subject,
        priority,
        category,
        description,
        assignedTo,
        status,
        modifiedBy,
        resolvedDate,
        targetResolveDate,
        lastModifiedDate
      },
      { new: true } // return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating the ticket' });
  }
};


module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  deleteTicket,
  updateTicket
};
