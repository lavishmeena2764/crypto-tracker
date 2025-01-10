import express, { json } from 'express';
import cron from 'node-cron';
import CryptoService from './services/cryptoService.js';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';
const logger = require('./utils/logger.js');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(json());


// Schedule background job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  logger.info('Running scheduled crypto data update');
  await CryptoService.updateCryptoData();
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});