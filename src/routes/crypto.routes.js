import { Router } from 'express';
const router = Router();
import cryptoService from '../services/cryptoService.js';
import logger from '../utils/logger.js';

router.get('/stats', async (req, res) => {
    try {
      const { coin } = req.query;
      if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin parameter' });
      }
      const stats = await cryptoService.fetchCryptoData(coin);
      res.json(stats);
    } catch (error) {
      logger.error(`Error in /stats endpoint: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  });
  
router.get('/fetch', async (req, res) => {
    try {
      const { coin } = req.query;
      if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin parameter' });
      }
      const stats = await cryptoService.getLatestStats(coin);
      res.json(stats);
    } catch (error) {
      logger.error(`Error in /stats endpoint: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  });

router.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
      return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    const deviation = await cryptoService.calculateStandardDeviation(coin);
    res.json({ deviation });
  } catch (error) {
    logger.error(`Error in /deviation endpoint: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

export default router;
