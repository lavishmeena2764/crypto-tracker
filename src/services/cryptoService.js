import axios from 'axios';
import cryptoPrice from '../models/cryptoPrice.model.js';
import logger from '../utils/logger.js';

class CryptoService {
  static async fetchCryptoData(coinId) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
      );

      const data = response.data[coinId];
      return {
        priceUSD: data.usd,
        marketCapUSD: data.usd_market_cap,
        change24h: data.usd_24h_change
      };
    } catch (error) {
      logger.error(`Error fetching data for ${coinId}: ${error.message}`);
      throw error;
    }
  }

  static async updateCryptoData() {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];

    for (const coin of coins) {
      try {
        const data = await this.fetchCryptoData(coin);
        await cryptoPrice.create({
          coinId: coin,
          ...data
        });
        logger.info(`Updated data for ${coin}`);
      } catch (error) {
        logger.error(`Failed to update data for ${coin}: ${error.message}`);
      }
    }
  }

  static async getLatestStats(coinId) {
    const latest = await cryptoPrice.findOne({ coinId })
      .sort({ timestamp: -1 })
      .lean();

    if (!latest) {
      throw new Error('No data found for the specified coin');
    }

    return {
      price: latest.priceUSD,
      marketCap: latest.marketCapUSD,
      "24hChange": latest.change24h
    };
  }
  static async calculateStandardDeviation(coinId) {
    const prices = await cryptoPrice.find({ coinId })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('priceUSD')
      .lean();

    if (prices.length === 0) {
      throw new Error('No data found for the specified coin');
    }

    const values = prices.map(p => p.priceUSD);
    const mean = values.reduce((a, b) => a + b) / values.length;
    const squareDiffs = values.map(value => {
      const diff = value - mean;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
    const stdDev = Math.sqrt(avgSquareDiff);

    return Number(stdDev.toFixed(2));
  }
}

export default CryptoService;