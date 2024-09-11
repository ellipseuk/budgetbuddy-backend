const mongoose = require('mongoose');

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;