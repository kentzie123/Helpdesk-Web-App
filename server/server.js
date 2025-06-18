require('dotenv').config();
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/rolePrivilegeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const Ticket = require('./models/tickets');
const Notification = require('./models/notification');
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
});

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', ticketRoutes);
app.use('/api', notificationRoutes);

// Connect to DB and watch changes
connectDB().then(() => {
  const notificationChangeStream = Notification.watch();
  const changeStream = Ticket.watch();


  // Ticket Change Stream
  changeStream.on('change', (change) => {

    console.log('🟡 Change detected:', change.operationType);

    if (change.operationType === 'insert') {
      const newTicket = change.fullDocument;
      io.emit('ticketCreated', newTicket);
      console.log('🟢 Emitted ticketCreated');
    }

    if (change.operationType === 'update') {
      // By default, update only returns updated fields, not the full doc
      // So we fetch the full document manually using _id
      Ticket.findById(change.documentKey._id).then((updatedTicket) => {
        if (updatedTicket) {
          io.emit('ticketUpdated', updatedTicket);
          console.log('🔵 Emitted ticketUpdated');
        }
      }).catch(err => console.error('Error fetching updated ticket:', err));
    }

    if (change.operationType === 'delete') {
      const deletedId = change.documentKey._id;
      io.emit('ticketDeleted', deletedId);
      console.log('🔴 Emitted ticketDeleted');
    }
  });

  // Notification Change Stream
  notificationChangeStream.on('change', (change) => {
    console.log('Notification change detected:', change.operationType);

    // Create
    if(change.operationType === 'insert'){
      const newNotification = change.fullDocument;
      io.emit('notificationCreated', newNotification);
      console.log('Emitted notificationCreated');
    }

    // Update
    if(change.operationType === 'update'){
      Notification.findById(change.documentKey._id).then((updatedNotification) => {
        if(updatedNotification){
          io.emit('notificationUpdated', updatedNotification);
          console.log('Emitted notificationUpdated');
        }
      })
    }

    // Delete
    if(change.operationType === 'delete'){
      const notificationDeletedId = change.documentKey._id;
      io.emit('notificationDeleted', notificationDeletedId)
    }
  })
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('📡 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
