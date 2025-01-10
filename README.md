# Cryptocurrency Price Tracker

A production-grade Node.js application that tracks cryptocurrency prices, market caps, and price changes using the CoinGecko API. The application stores historical data and provides statistical analysis through REST APIs.

## Features

- **Automated Price Tracking**: Background job runs every 2 hours to fetch latest cryptocurrency data
- **Multiple Cryptocurrencies**: Tracks Bitcoin, Ethereum, and Matic
- **Historical Data**: Stores price history in MongoDB
- **REST APIs**: Endpoints for retrieving latest stats and price deviation
- **Production Ready**: Includes logging, error handling, and best practices

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- node-cron
- Winston (logging)
- Jest (testing)
- Axios

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local instance or Atlas URI)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lavishmeena2764/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Documentation

### Get Latest Cryptocurrency Stats

Retrieves the latest price, market cap, and 24-hour change for a specified cryptocurrency.

```
GET /api/stats
```

Query Parameters:
- `coin` (required): One of `bitcoin`, `matic-network`, or `ethereum`

Example Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Latest Cryptocurrency Stats from db

Retrieves the latest price, market cap, and 24-hour change for a specified cryptocurrency from db.

```
GET /api/fetch
```

Query Parameters:
- `coin` (required): One of `bitcoin`, `matic-network`, or `ethereum`

Example Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Price Standard Deviation

Calculates the standard deviation of prices for the last 100 records of a specified cryptocurrency.

```
GET /api/deviation
```

Query Parameters:
- `coin` (required): One of `bitcoin`, `matic-network`, or `ethereum`

Example Response:
```json
{
    "deviation": 4082.48
}
```

## Database Schema

### CryptoPrice Model

```javascript
{
    coinId: String,        // Cryptocurrency identifier
    priceUSD: Number,      // Current price in USD
    marketCapUSD: Number,  // Market capitalization in USD
    change24h: Number,     // 24-hour price change percentage
    timestamp: Date        // Time of data collection
}
```

## Development

### Project Structure
```
crypto-tracker/
├── src/
│   ├── config/
│   │   └── db.config.js
│   ├── models/
│   │   └── cryptoPrice.model.js
│   ├── routes/
│   │   └── crypto.routes.js
│   ├── services/
│   │   └── cryptoService.js
│   ├── utils/
│   │   └── logger.js
│   ├── app.js
|   ├── .env
├── .gitignore
├── package.json
└── README.md
```

### Adding New Features

1. Create new routes in `src/routes/`
2. Add business logic in `src/services/`
3. Create new models in `src/models/` if needed
4. Update tests accordingly

## Testing

Run tests using:
```bash
npm test
```

## Error Handling

The application uses Winston for logging:
- Error logs: `error.log`
- Combined logs: `combined.log`
- Console logs in development mode
