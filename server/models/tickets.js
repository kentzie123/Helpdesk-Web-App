const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  ownerPic: {type: String},
  ownerName: { type: String, required: true },
  subject: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  category: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: String },
  status: { 
    type: String,
    enum: ['New', 'In Progress', 'Open', 'Closed', 'Resolved'],
    required: true
  },
  modifiedBy: { type: String },
  createdDate: { type: String, required: true }, // You can also use Date type if needed
  resolvedDate: { type: String, default: '' },
  targetResolveDate: { type: String },
  lastModifiedDate: { type: String }
}, { collection: 'tickets' });

module.exports = mongoose.model('Ticket', ticketSchema, 'tickets');
