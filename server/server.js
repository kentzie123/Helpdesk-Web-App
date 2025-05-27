require('dotenv').config();
const cors = require('cors'); // 👈 Add this
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/rolePrivilegeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// 👇 Allow cross-origin requests
app.use(cors({
    origin: '*', // or use "*" to allow all origins
    credentials: true
  }));

connectDB();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));