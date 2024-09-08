const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running on the port: ${PORT}`);
});