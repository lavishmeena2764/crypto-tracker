import { get } from 'axios';
import { create, findOne, find } from '../models/CryptoPrice';
import { error as _error, info } from '../utils/logger';

class CryptoService {
  static async fetchCryptoData(coinId) {
    try {
      const response = await get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
      );

      const data = response.data[coinId];
      return {
        priceUSD: data.usd,
        marketCapUSD: data.usd_market_cap,
        change24h: data.usd_24h_change
      };
    } catch (error) {
      _error(`Error fetching data for ${coinId}: ${error.message}`);
      throw error;
    }
  }

  static async updateCryptoData() {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    
    for (const coin of coins) {
      try {
        const data = await this.fetchCryptoData(coin);
        await create({
          coinId: coin,
          ...data
        });
        info(`Updated data for ${coin}`);
      } catch (error) {
        _error(`Failed to update data for ${coin}: ${error.message}`);
      }
    }
  }

  static async getLatestStats(coinId) {
    const latest = await findOne({ coinId })
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
}

export default CryptoService;