const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  ownerPic: { type: String },
  ownerUserId: { type: String, required: true },
  ownerName: { type: String, required: true},
  subject: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], required: true },
  category: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: String },
  status: { 
    type: String,
    enum: ['New', 'In Progress', 'Open', 'Closed', 'Resolved'],
    required: true
  },
  modifiedBy: { type: String, default: '' }, 
  createdDate: { type: Date, default: Date.now },
  resolvedDate: { type: Date, default: null },
  targetResolveDate: { type: Date },
  lastModifiedDate: { type: Date, default: null }
}, { collection: 'tickets' }, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema, 'tickets');
