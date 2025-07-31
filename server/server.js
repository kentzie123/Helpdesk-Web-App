// Load environment variables
require('dotenv').config();

// Core modules and configuration
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/db');

// Initialize Express app and server
const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/rolePrivilegeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const pagePrivilegeRoutes = require('./routes/pagePrivilegeRoutes');
const knowledgeBaseRoutes = require('./routes/knowledgeBaseRoutes');
const articleViewsRoutes = require('./routes/articleViewsRoutes');
const articleRatingsRoutes = require('./routes/articleRatingRoute');
const confirmationCodeRoutes = require('./routes/confirmationCodeRoutes');
const ticketRatingsRoutes = require('./routes/ticketRatingRoutes');
const ticketCommentsRoutes = require('./routes/ticketCommentRoutes');

// Route usage
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', ticketRoutes);
app.use('/api', notificationRoutes);
app.use('/api', pagePrivilegeRoutes);
app.use('/api', knowledgeBaseRoutes);
app.use('/api', articleViewsRoutes);
app.use('/api', articleRatingsRoutes);
app.use('/api', confirmationCodeRoutes);
app.use('/api', ticketRatingsRoutes);
app.use('/api', ticketCommentsRoutes);

app.post('/api/test', (req, res) => {
  console.log("✅ /api/test hit");
  res.json({ status: "OK" });
});

// Models for watching changes
const Ticket = require('./models/tickets');
const Notification = require('./models/notification');
const Article = require('./models/knowledgeBase');

// Connect to DB and set up change streams
connectDB().then(() => {
  const ticketChangeStream = Ticket.watch();
  const notificationChangeStream = Notification.watch();
  const articleChangeStream = Article.watch();

  // Watch Article changes
  articleChangeStream.on('change', (change) => {
    console.log('🟡 Article Change detected:', change.operationType);

    if (change.operationType === 'insert') {
      io.emit('articleCreated', change.fullDocument);
      console.log('🟢 Emitted articleCreated');
    }

    if (change.operationType === 'update') {
      Article.findById(change.documentKey._id)
        .then(updatedArticle => {
          if (updatedArticle) {
            io.emit('articleUpdated', updatedArticle);
            console.log('🔵 Emitted articleUpdated');
          }
        })
        .catch(err => console.error('Error fetching updated article:', err));
    }

    if (change.operationType === 'delete') {
      io.emit('articleDeleted', change.documentKey._id);
      console.log('🔴 Emitted articleDeleted');
    }
  });

  // Watch Ticket changes
  ticketChangeStream.on('change', (change) => {
    console.log('🟡 Ticket Change detected:', change.operationType);

    if (change.operationType === 'insert') {
      io.emit('ticketCreated', change.fullDocument);
      console.log('🟢 Emitted ticketCreated');
    }

    if (change.operationType === 'update') {
      Ticket.findById(change.documentKey._id)
        .then(updatedTicket => {
          if (updatedTicket) {
            io.emit('ticketUpdated', updatedTicket);
            console.log('🔵 Emitted ticketUpdated');
          }
        })
        .catch(err => console.error('Error fetching updated ticket:', err));
    }

    if (change.operationType === 'delete') {
      io.emit('ticketDeleted', change.documentKey._id);
      console.log('🔴 Emitted ticketDeleted');
    }
  });

  // Watch Notification changes
  notificationChangeStream.on('change', (change) => {
    console.log('🟡 Notification Change detected:', change.operationType);

    if (change.operationType === 'insert') {
      io.emit('notificationCreated', change.fullDocument);
      console.log('🟢 Emitted notificationCreated');
    }

    if (change.operationType === 'update') {
      Notification.findById(change.documentKey._id)
        .then(updatedNotification => {
          if (updatedNotification) {
            io.emit('notificationUpdated', updatedNotification);
            console.log('🔵 Emitted notificationUpdated');
          }
        });
    }

    if (change.operationType === 'delete') {
      io.emit('notificationDeleted', change.documentKey._id);
      console.log('🔴 Emitted notificationDeleted');
    }
  });
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('📡 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
