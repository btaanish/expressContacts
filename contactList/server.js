import express from 'express';
import 'dotenv/config';
import connectDb from './config/dbConnection.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { contactRoutes, userRoutes } from './routes/index.js'; // Assuming you've created an index.js in your routes directory

// Connect to Database
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Basic Security with Helmet
app.use(helmet());

// Enable CORS for all requests
app.use(cors());

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware for parsing JSON bodies
app.use(express.json());

// Route Middlewares
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// Use Custom Error Handler Middleware
app.use(errorHandler);

// Server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
