import express, { json } from 'express';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});