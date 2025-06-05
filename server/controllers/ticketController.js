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
 
  const generateTicketId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); 
    return `TICK-${year}-${randomNum}`;
  };

  const ticketIdGenerated = generateTicketId();

  const {
    ownerPic,
    ownerName,
    subject,
    priority,
    category,
    description,
    assignedTo,
    targetResolveDate,
  } = req.body;


  if(!subject || !priority || !category || !targetResolveDate) {

    return res.status(400).json({ error: 'Please fill in all required fields.' });

  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const resolveDate = new Date(targetResolveDate);
  resolveDate.setHours(0, 0, 0, 0);

  if (resolveDate < today) {
    return res.status(400).json({ error: 'Target resolve date cannot be in the past.' });
  }



  try {
    const newTicket = new Ticket({
      ticketId: ticketIdGenerated,
      ownerPic,
      ownerName,
      subject,
      priority,
      category,
      description,
      assignedTo,
      status: assignedTo ? 'New' : 'Open',
      targetResolveDate
    });

    await newTicket.save();

    res.status(201).json("Created ticket successfully");

  } catch (err) {
    console.error('Create ticket error:', err);
    res.status(500).json({ error: 'Server error while creating ticket' });
  }
};


// Update a ticket
const updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const {
    subject,
    priority,
    category,
    description,
    assignedTo,
    modifiedBy,
    targetResolveDate,
    lastModifiedDate
  } = req.body;

   if(!subject || !priority || !category || !targetResolveDate) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const resolveDate = new Date(targetResolveDate);
  resolveDate.setHours(0, 0, 0, 0);

  if (resolveDate < today) {
    return res.status(400).json({ error: 'Target resolve date cannot be in the past.' });
  }


  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { ticketId: ticketId },
      {
        subject,
        priority,
        category,
        description,
        assignedTo,
        modifiedBy,
        targetResolveDate,
        lastModifiedDate: new Date()
      },
      { new: true } // return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

     res.status(201).json("Ticket updated successfully");
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating the ticket' });
  }
};


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





module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  deleteTicket,
  updateTicket
};
