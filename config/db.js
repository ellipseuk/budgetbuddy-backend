import { connect } from 'mongoose';

// Connect to the database
const connectDB = async () => {
  try {
    await connect(process.env.DATABASE);
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;