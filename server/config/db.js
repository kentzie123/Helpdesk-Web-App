const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected' , conn.connection.host);
  } catch (err) {
    console.error('DB connection failed:', err.message);
  }
};

module.exports = connectDB;