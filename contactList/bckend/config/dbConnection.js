import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDb;
